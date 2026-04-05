"""
Bot Telegram - Agent IA Coach Formateur (Version Webhook - Plan Free Render)
Formation certifiante : "Intégrer l'IA dans les missions du consultant formateur"

Architecture légère : TF-IDF + GPT-4.1-mini
- Pas de PyTorch / sentence-transformers
- RAM < 150 MB (compatible plan Free Render)
- Mode Webhook FastAPI
"""

import os
import pickle
import logging
import asyncio
from datetime import datetime

from fastapi import FastAPI, Request, Response
from telegram import Update, BotCommand
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)
from telegram.constants import ParseMode, ChatAction
from telegram.request import HTTPXRequest
from openai import OpenAI
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# ─── Configuration ────────────────────────────────────────────────────────────

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
WEBHOOK_URL = os.environ.get("WEBHOOK_URL", "")
PORT = int(os.environ.get("PORT", 10000))

_script_dir = os.path.dirname(os.path.abspath(__file__))
VECTOR_STORE_PATH = os.environ.get(
    "VECTOR_STORE_PATH",
    os.path.join(_script_dir, "vector_store")
)
KB_PATH = os.path.join(VECTOR_STORE_PATH, "knowledge_base.pkl")
LLM_MODEL = "gpt-4.1-mini"
TOP_K_DOCS = 5

# ─── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ─── Chargement de la base de connaissances ───────────────────────────────────

kb_data = None

def load_knowledge_base():
    global kb_data
    if kb_data is not None:
        return kb_data
    logger.info(f"Chargement de la base de connaissances depuis: {KB_PATH}")
    try:
        with open(KB_PATH, "rb") as f:
            kb_data = pickle.load(f)
        logger.info(f"Base chargée: {len(kb_data['chunks'])} chunks")
        return kb_data
    except Exception as e:
        logger.error(f"Erreur chargement KB: {e}")
        return None

def retrieve_context(query: str, top_k: int = TOP_K_DOCS) -> str:
    """Recherche les passages les plus pertinents via TF-IDF."""
    kb = load_knowledge_base()
    if kb is None:
        return ""

    try:
        vectorizer = kb["vectorizer"]
        tfidf_matrix = kb["tfidf_matrix"]
        chunks = kb["chunks"]

        query_vec = vectorizer.transform([query])
        scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
        top_indices = scores.argsort()[-top_k:][::-1]

        relevant_chunks = []
        for idx in top_indices:
            if scores[idx] > 0.01:
                relevant_chunks.append(chunks[idx])

        return "\n\n---\n\n".join(relevant_chunks)
    except Exception as e:
        logger.error(f"Erreur retrieve_context: {e}")
        return ""

# ─── Client OpenAI ────────────────────────────────────────────────────────────

def get_openai_client():
    """Retourne le client OpenAI configuré selon l'environnement."""
    if OPENAI_API_KEY and OPENAI_API_KEY.startswith("sk-"):
        # Production : API OpenAI native
        return OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.openai.com/v1")
    else:
        # Développement : proxy Manus
        return OpenAI()

def generate_response(question: str, context: str) -> str:
    """Génère une réponse pédagogique basée sur le contexte du cours."""
    client = get_openai_client()

    system_prompt = """Tu es un coach formateur expert en Intelligence Artificielle, spécialisé dans la formation certifiante "Intégrer l'IA dans les missions du consultant formateur".

Ton rôle est d'accompagner les stagiaires avec bienveillance et pédagogie. Tu réponds uniquement en te basant sur le contenu du cours fourni dans le contexte.

Règles :
- Réponds toujours en français
- Sois pédagogique, clair et encourageant
- Cite les modules ou passages du cours quand c'est pertinent
- Si la réponse n'est pas dans le cours, dis-le honnêtement et oriente vers le formateur
- Utilise des exemples concrets liés à la formation
- Structure tes réponses avec des titres et listes quand c'est utile
- Termine par une question ou un encouragement pour maintenir l'engagement"""

    user_message = f"""Question de l'apprenant : {question}

Contexte extrait du cours :
{context if context else "Aucun passage spécifique trouvé pour cette question."}

Réponds de manière pédagogique et bienveillante."""

    try:
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Erreur OpenAI: {e}")
        return "Je rencontre une difficulté technique. Merci de réessayer dans quelques instants."

# ─── Handlers Telegram ────────────────────────────────────────────────────────

async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Message de bienvenue."""
    user = update.effective_user
    welcome_msg = f"""👋 Bonjour {user.first_name} !

Je suis votre **Coach IA** pour la formation certifiante :
📚 *"Intégrer l'IA dans les missions du consultant formateur"*

Je suis là pour répondre à toutes vos questions sur le contenu du cours, vous aider à comprendre les concepts et vous accompagner dans votre apprentissage.

**Comment m'utiliser :**
Posez-moi simplement votre question en langage naturel !

**Exemples de questions :**
• "Qu'est-ce que le meta prompting ?"
• "Comment utiliser Make pour automatiser les attestations ?"
• "Quels sont les conseils pour le dossier de certification ?"

**Commandes disponibles :**
/aide - Afficher cette aide
/modules - Liste des modules du cours
/certification - Conseils pour la certification

Bonne formation ! 🚀"""

    await update.message.reply_text(welcome_msg, parse_mode=ParseMode.MARKDOWN)

async def aide_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Affiche l'aide."""
    await start_handler(update, context)

async def modules_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Liste les modules du cours."""
    modules_msg = """📚 **Modules de la formation**

**Module 1 - Fondamentaux de l'IA**
Introduction à l'IA générative, comprendre les LLMs, premiers prompts

**Module 2 - L'Art du Prompt**
Techniques de prompting, meta-prompting, prompt engineering avancé

**Module 3 - Automatisation avec Make**
Créer des workflows automatisés, connecter les outils IA, automatiser les attestations

**Module 4 - IA dans la pédagogie**
Intégrer l'IA dans la conception de formations, créer des contenus avec l'IA

**Module 5 - Certification**
Préparer le dossier de certification, critères d'évaluation, conseils pratiques

Posez-moi une question sur n'importe quel module ! 💡"""

    await update.message.reply_text(modules_msg, parse_mode=ParseMode.MARKDOWN)

async def certification_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Conseils pour la certification."""
    context_text = retrieve_context("certification dossier évaluation critères")
    response = generate_response(
        "Quels sont les conseils essentiels pour réussir la certification ?",
        context_text
    )
    await update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN)

async def message_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Traite les messages des apprenants."""
    if not update.message or not update.message.text:
        return

    question = update.message.text.strip()
    user = update.effective_user
    logger.info(f"Question de {user.first_name} ({user.id}): {question[:50]}...")

    # Indicateur de frappe
    await update.message.chat.send_action(ChatAction.TYPING)

    # Recherche du contexte
    context_text = retrieve_context(question)

    # Génération de la réponse
    response = generate_response(question, context_text)

    # Envoi de la réponse
    try:
        await update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN)
    except Exception:
        # Fallback sans Markdown si erreur de parsing
        await update.message.reply_text(response)

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Gère les erreurs."""
    logger.error(f"Erreur: {context.error}")

# ─── Application FastAPI + Telegram ──────────────────────────────────────────

app = FastAPI(title="Coach Formateur IA Bot")
telegram_app = None

@app.on_event("startup")
async def startup():
    global telegram_app

    # Pré-charger la base de connaissances
    load_knowledge_base()

    # Configurer le bot Telegram
    request = HTTPXRequest(connect_timeout=30, read_timeout=30)
    telegram_app = (
        Application.builder()
        .token(TELEGRAM_TOKEN)
        .request(request)
        .build()
    )

    # Enregistrer les handlers
    telegram_app.add_handler(CommandHandler("start", start_handler))
    telegram_app.add_handler(CommandHandler("aide", aide_handler))
    telegram_app.add_handler(CommandHandler("modules", modules_handler))
    telegram_app.add_handler(CommandHandler("certification", certification_handler))
    telegram_app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, message_handler))
    telegram_app.add_error_handler(error_handler)

    await telegram_app.initialize()

    # Configurer le webhook
    webhook_url = f"{WEBHOOK_URL}/webhook"
    await telegram_app.bot.set_webhook(
        url=webhook_url,
        allowed_updates=["message", "callback_query"]
    )
    logger.info(f"Webhook configuré: {webhook_url}")

    # Définir les commandes du menu
    await telegram_app.bot.set_my_commands([
        BotCommand("start", "Démarrer le coach IA"),
        BotCommand("aide", "Afficher l'aide"),
        BotCommand("modules", "Liste des modules"),
        BotCommand("certification", "Conseils certification"),
    ])

    await telegram_app.start()
    logger.info("Bot démarré avec succès !")

@app.on_event("shutdown")
async def shutdown():
    if telegram_app:
        await telegram_app.stop()
        await telegram_app.shutdown()

@app.post("/webhook")
async def webhook(request: Request):
    """Endpoint webhook Telegram."""
    try:
        data = await request.json()
        update = Update.de_json(data, telegram_app.bot)
        await telegram_app.process_update(update)
        return Response(content="OK", status_code=200)
    except Exception as e:
        logger.error(f"Erreur webhook: {e}")
        return Response(content="Error", status_code=500)

@app.get("/health")
async def health():
    """Health check pour Render."""
    kb = load_knowledge_base()
    return {
        "status": "healthy",
        "bot": "coach-formateur-ia",
        "kb_loaded": kb is not None,
        "kb_chunks": len(kb["chunks"]) if kb else 0,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/")
async def root():
    return {"message": "Coach Formateur IA Bot - En ligne", "status": "ok"}

# ─── Point d'entrée ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)

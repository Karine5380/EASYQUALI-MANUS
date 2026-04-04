"""
Bot Telegram - Agent IA Coach Formateur (Version Webhook pour déploiement cloud)
Formation certifiante : "Intégrer l'IA dans les missions du consultant formateur"

Mode Webhook : le bot expose un endpoint HTTP que Telegram appelle directement.
Adapté pour Render.com, Railway, Heroku, etc.
"""

import os
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

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from openai import OpenAI

# ─── Configuration (variables d'environnement) ────────────────────────────────

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
WEBHOOK_URL = os.environ.get("WEBHOOK_URL", "")  # ex: https://mon-bot.onrender.com
PORT = int(os.environ.get("PORT", 8000))

# Chemin du vector store : /app/vector_store en Docker, chemin local sinon
_script_dir = os.path.dirname(os.path.abspath(__file__))
VECTOR_STORE_PATH = os.environ.get(
    "VECTOR_STORE_PATH",
    os.path.join(_script_dir, "vector_store")
)
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
LLM_MODEL = "gpt-4.1-mini"
TOP_K_DOCS = 5

# ─── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

# ─── Application FastAPI ──────────────────────────────────────────────────────

app = FastAPI(title="Coach Formateur IA Bot")

# ─── Initialisation des composants RAG ────────────────────────────────────────

logger.info("Chargement du modèle d'embeddings...")
embeddings = HuggingFaceEmbeddings(
    model_name=EMBEDDING_MODEL,
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)

logger.info("Chargement de la base de connaissances FAISS...")
vector_store = FAISS.load_local(
    VECTOR_STORE_PATH,
    embeddings,
    allow_dangerous_deserialization=True,
)
logger.info("Base de connaissances chargée avec succès !")

# Utiliser le proxy Manus si disponible, sinon OpenAI direct
_openai_base_url = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1")
if OPENAI_API_KEY:
    openai_client = OpenAI(api_key=OPENAI_API_KEY, base_url=_openai_base_url)
else:
    # Fallback : utilise les variables d'environnement par défaut
    openai_client = OpenAI()

# ─── Prompt système ───────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Tu es un coach formateur expert et bienveillant, spécialisé dans la formation certifiante "Intégrer l'IA dans les missions du consultant formateur".

Ton rôle est d'accompagner les stagiaires dans leur apprentissage en répondant à leurs questions de manière :
- **Pédagogique** : explique clairement, avec des exemples concrets tirés du livret
- **Encourageante** : motive les stagiaires, valorise leurs efforts
- **Précise** : base-toi sur le contenu du livret de formation fourni
- **Pratique** : donne des conseils applicables immédiatement

La formation couvre 6 modules :
1. Introduction à l'IA et ses applications en formation
2. Conception de parcours pédagogiques personnalisés
3. Automatisation des processus de formation
4. Animation de formations avec l'IA et évaluations des acquis
5. Création de contenus pédagogiques multimédias
6. Veille technologique IA

Règles importantes :
- Réponds TOUJOURS en français
- Si la question ne concerne pas la formation, redirige poliment vers les sujets de la formation
- Si tu n'as pas d'information dans le contexte fourni, dis-le honnêtement et encourage le stagiaire à consulter le livret ou à poser la question lors d'une classe synchrone
- Utilise des emojis avec modération pour rendre les réponses plus engageantes
- Formate tes réponses avec du Markdown pour une meilleure lisibilité
- Termine toujours par une question ou une invitation à aller plus loin

Contexte du livret de formation (passages pertinents) :
{context}
"""

# ─── Fonctions utilitaires ────────────────────────────────────────────────────

def retrieve_context(question: str) -> str:
    docs = vector_store.similarity_search(question, k=TOP_K_DOCS)
    context_parts = []
    for i, doc in enumerate(docs, 1):
        page = doc.metadata.get("page", "?")
        content = doc.page_content.strip()
        if content:
            context_parts.append(f"[Passage {i} - Page {page + 1}]\n{content}")
    return "\n\n---\n\n".join(context_parts)


def generate_response(question: str, context: str) -> str:
    system_message = SYSTEM_PROMPT.format(context=context)
    response = openai_client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": question},
        ],
        max_tokens=1000,
        temperature=0.7,
    )
    return response.choices[0].message.content


# ─── Gestionnaires de commandes Telegram ──────────────────────────────────────

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    first_name = user.first_name if user.first_name else "stagiaire"
    welcome_message = (
        f"👋 Bonjour {first_name} !\n\n"
        "Je suis votre *Coach IA Formateur*, votre assistant personnel pour la formation certifiante "
        "*\"Intégrer l'IA dans les missions du consultant formateur\"* 🎓\n\n"
        "Je suis là pour vous aider à :\n"
        "• Comprendre les concepts du cours\n"
        "• Répondre à vos questions sur les 6 modules\n"
        "• Vous guider dans la pratique des outils IA\n"
        "• Préparer votre certification\n\n"
        "📚 *Les 6 modules de votre formation :*\n"
        "1️⃣ Introduction à l'IA et ses applications\n"
        "2️⃣ Conception de parcours pédagogiques\n"
        "3️⃣ Automatisation des processus\n"
        "4️⃣ Animation et évaluation avec l'IA\n"
        "5️⃣ Contenus pédagogiques multimédias\n"
        "6️⃣ Veille technologique IA\n\n"
        "💬 Posez-moi vos questions librement !\n\n"
        "Tapez /aide pour voir toutes les commandes disponibles."
    )
    await update.message.reply_text(welcome_message, parse_mode=ParseMode.MARKDOWN)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    help_text = (
        "🤖 *Commandes disponibles :*\n\n"
        "/start - Message de bienvenue\n"
        "/aide - Afficher cette aide\n"
        "/modules - Voir la liste des modules\n"
        "/module1 - Module 1 : Introduction à l'IA\n"
        "/module2 - Module 2 : Conception de parcours\n"
        "/module3 - Module 3 : Automatisation\n"
        "/module4 - Module 4 : Animation et évaluation\n"
        "/module5 - Module 5 : Contenus multimédias\n"
        "/module6 - Module 6 : Veille IA\n"
        "/certification - Infos sur la certification\n"
        "/reset - Réinitialiser la conversation\n\n"
        "💡 Ou posez simplement votre question directement !"
    )
    await update.message.reply_text(help_text, parse_mode=ParseMode.MARKDOWN)


async def modules_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    modules_text = (
        "📚 *Les 6 modules de votre formation certifiante :*\n\n"
        "*Module 1* - Introduction à l'IA et ses applications en formation\n"
        "_Comprendre l'IAG, paramétrer son compte, l'art du prompt, éthique et réglementation_\n\n"
        "*Module 2* - Conception de parcours pédagogiques personnalisés\n"
        "_Analyse du besoin, programme de formation, charte graphique, PowerPoint avec l'IA_\n\n"
        "*Module 3* - Automatisation des processus de formation\n"
        "_Assistants IA, Make, n8n, automatisation avancée_\n\n"
        "*Module 4* - Animation de formations avec l'IA et évaluations\n"
        "_Brainstorming, jeux de rôle, QCM, enquêtes de satisfaction_\n\n"
        "*Module 5* - Création de contenus pédagogiques multimédias\n"
        "_Pages web, podcasts, vidéos flash, microlearning, robot SAV_\n\n"
        "*Module 6* - Veille technologique IA\n"
        "_Influenceurs IA, newsletters, automatisation de la veille avec Make_\n\n"
        "Sur quel module avez-vous des questions ? 🎯"
    )
    await update.message.reply_text(modules_text, parse_mode=ParseMode.MARKDOWN)


async def module_command(update: Update, context: ContextTypes.DEFAULT_TYPE, module_num: int) -> None:
    module_descriptions = {
        1: ("Introduction à l'IA et ses applications en formation",
            "Que souhaitez-vous savoir sur ce module ? Vous pouvez me poser des questions sur : l'IAG, ChatGPT, l'art du prompt, les biais et hallucinations, l'éthique de l'IA, etc."),
        2: ("Conception de parcours pédagogiques personnalisés",
            "Posez-moi vos questions sur : l'analyse du besoin, la construction de programmes de formation, le livret stagiaire, la charte graphique, les présentations PowerPoint avec l'IA, etc."),
        3: ("Automatisation des processus de formation",
            "Quelles questions avez-vous sur : la création d'assistants IA, les GPTs personnalisés, Make, n8n, l'automatisation des attestations et programmes de formation, etc. ?"),
        4: ("Animation de formations avec l'IA et évaluations des acquis",
            "Je peux vous aider sur : le brainstorming avec l'IA, les jeux de rôle pédagogiques, la création de QCM, les enquêtes de satisfaction, etc."),
        5: ("Création de contenus pédagogiques multimédias",
            "Des questions sur : la création de pages web de formation, les podcasts, les vidéos flash multilingues, les microlearnings, les robots SAV post-formation, etc. ?"),
        6: ("Veille technologique IA",
            "Posez vos questions sur : les influenceurs IA à suivre, la veille avec ChatGPT, le résumé de newsletters et vidéos YouTube, l'automatisation de la veille avec Make, etc."),
    }
    title, prompt = module_descriptions.get(module_num, ("Module inconnu", ""))
    message = f"🎯 *Module {module_num} : {title}*\n\n{prompt}"
    await update.message.reply_text(message, parse_mode=ParseMode.MARKDOWN)


async def module1_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 1)

async def module2_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 2)

async def module3_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 3)

async def module4_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 4)

async def module5_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 5)

async def module6_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await module_command(update, context, 6)


async def certification_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    cert_text = (
        "🏆 *Votre certification IA*\n\n"
        "Cette formation mène à une *certification professionnelle* reconnue.\n\n"
        "*Comment préparer votre certification :*\n"
        "• Mettez en pratique les exercices sur vos propres cas métiers\n"
        "• Construisez votre dossier professionnel au fil de l'eau\n"
        "• Récupérez les exercices réalisés dans chaque module\n"
        "• Consultez le modèle de dossier dans votre espace extranet\n\n"
        "*Conseil clé :* Travaillez sur vos propres offres et cas réels, pas sur des cas fictifs !\n\n"
        "Avez-vous des questions spécifiques sur la préparation de votre dossier de certification ? 📝"
    )
    await update.message.reply_text(cert_text, parse_mode=ParseMode.MARKDOWN)


async def reset_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    context.user_data.clear()
    await update.message.reply_text(
        "🔄 Conversation réinitialisée ! Posez-moi votre prochaine question.",
        parse_mode=ParseMode.MARKDOWN,
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    question = update.message.text.strip()
    if not question:
        return
    logger.info(f"Question de {user.first_name} (ID: {user.id}): {question[:100]}")
    await update.message.chat.send_action(ChatAction.TYPING)
    try:
        context_text = retrieve_context(question)
        response = generate_response(question, context_text)
        if len(response) > 4000:
            parts = [response[i:i+4000] for i in range(0, len(response), 4000)]
            for part in parts:
                await update.message.reply_text(part, parse_mode=ParseMode.MARKDOWN)
        else:
            await update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN)
        logger.info(f"Réponse envoyée à {user.first_name} ({len(response)} caractères)")
    except Exception as e:
        logger.error(f"Erreur: {e}", exc_info=True)
        await update.message.reply_text(
            "⚠️ Désolé, j'ai rencontré une difficulté technique. Veuillez réessayer dans quelques instants."
        )


async def handle_non_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "📝 Je suis un coach textuel ! Posez-moi votre question en texte. 😊"
    )


# ─── Configuration du bot Telegram ────────────────────────────────────────────

async def post_init(application: Application) -> None:
    commands = [
        BotCommand("start", "Démarrer le bot"),
        BotCommand("aide", "Voir toutes les commandes"),
        BotCommand("modules", "Liste des 6 modules"),
        BotCommand("module1", "Module 1 - Introduction à l'IA"),
        BotCommand("module2", "Module 2 - Conception de parcours"),
        BotCommand("module3", "Module 3 - Automatisation"),
        BotCommand("module4", "Module 4 - Animation et évaluation"),
        BotCommand("module5", "Module 5 - Contenus multimédias"),
        BotCommand("module6", "Module 6 - Veille IA"),
        BotCommand("certification", "Infos sur la certification"),
        BotCommand("reset", "Réinitialiser la conversation"),
    ]
    await application.bot.set_my_commands(commands)
    logger.info("Commandes du bot configurées.")


# Construire l'application Telegram
ptb_app = (
    Application.builder()
    .token(TELEGRAM_TOKEN)
    .updater(None)  # Pas d'updater en mode webhook
    .post_init(post_init)
    .build()
)

# Enregistrer les handlers
ptb_app.add_handler(CommandHandler("start", start_command))
ptb_app.add_handler(CommandHandler("aide", help_command))
ptb_app.add_handler(CommandHandler("help", help_command))
ptb_app.add_handler(CommandHandler("modules", modules_command))
ptb_app.add_handler(CommandHandler("module1", module1_command))
ptb_app.add_handler(CommandHandler("module2", module2_command))
ptb_app.add_handler(CommandHandler("module3", module3_command))
ptb_app.add_handler(CommandHandler("module4", module4_command))
ptb_app.add_handler(CommandHandler("module5", module5_command))
ptb_app.add_handler(CommandHandler("module6", module6_command))
ptb_app.add_handler(CommandHandler("certification", certification_command))
ptb_app.add_handler(CommandHandler("reset", reset_command))
ptb_app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
ptb_app.add_handler(MessageHandler(~filters.TEXT, handle_non_text))


# ─── Routes FastAPI ───────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    await ptb_app.initialize()
    await ptb_app.start()
    # Enregistrer le webhook auprès de Telegram
    webhook_path = f"/webhook/{TELEGRAM_TOKEN}"
    full_url = f"{WEBHOOK_URL}{webhook_path}"
    await ptb_app.bot.set_webhook(url=full_url)
    logger.info(f"Webhook configuré : {full_url}")


@app.on_event("shutdown")
async def shutdown():
    await ptb_app.bot.delete_webhook()
    await ptb_app.stop()
    await ptb_app.shutdown()
    logger.info("Bot arrêté proprement.")


@app.post(f"/webhook/{{token}}")
async def webhook_handler(token: str, request: Request):
    """Endpoint appelé par Telegram à chaque nouveau message."""
    if token != TELEGRAM_TOKEN:
        return Response(status_code=403)
    data = await request.json()
    update = Update.de_json(data, ptb_app.bot)
    await ptb_app.process_update(update)
    return Response(status_code=200)


@app.get("/")
async def health_check():
    """Health check pour Render."""
    return {"status": "ok", "bot": "Coach Formateur IA", "uptime": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


# ─── Point d'entrée ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)

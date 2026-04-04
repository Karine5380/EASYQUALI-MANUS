"""
Bot Telegram - Agent IA Coach Formateur
Formation certifiante : "Intégrer l'IA dans les missions du consultant formateur"

Ce bot utilise une architecture RAG (Retrieval-Augmented Generation) :
1. La question de l'élève est transformée en vecteur
2. Les passages les plus pertinents du livret sont récupérés
3. Le LLM génère une réponse pédagogique basée sur ces passages
"""

import os
import logging
import asyncio
from datetime import datetime

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

# ─── Configuration ────────────────────────────────────────────────────────────

TELEGRAM_TOKEN = "8609866499:AAGThZ1Em0KdO5nCIwoCxJ0f0hepDrqxNuk"
VECTOR_STORE_PATH = "/home/ubuntu/telegram_coach_bot/vector_store"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
LLM_MODEL = "gpt-4.1-mini"
TOP_K_DOCS = 5  # Nombre de passages à récupérer

# ─── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[
        logging.FileHandler("/home/ubuntu/telegram_coach_bot/bot.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

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

# Client OpenAI (via proxy Manus)
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
- Formate tes réponses avec du Markdown pour une meilleure lisibilité (mais garde en tête les limites de Telegram)
- Termine toujours par une question ou une invitation à aller plus loin

Contexte du livret de formation (passages pertinents) :
{context}
"""

# ─── Fonctions utilitaires ────────────────────────────────────────────────────

def retrieve_context(question: str) -> str:
    """Récupère les passages les plus pertinents du livret pour une question donnée."""
    docs = vector_store.similarity_search(question, k=TOP_K_DOCS)
    context_parts = []
    for i, doc in enumerate(docs, 1):
        page = doc.metadata.get("page", "?")
        content = doc.page_content.strip()
        if content:
            context_parts.append(f"[Passage {i} - Page {page + 1}]\n{content}")
    return "\n\n---\n\n".join(context_parts)


def generate_response(question: str, context: str) -> str:
    """Génère une réponse pédagogique basée sur le contexte récupéré."""
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


def escape_markdown_v2(text: str) -> str:
    """Échappe les caractères spéciaux pour MarkdownV2 de Telegram."""
    special_chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
    for char in special_chars:
        text = text.replace(char, f'\\{char}')
    return text


# ─── Gestionnaires de commandes Telegram ──────────────────────────────────────

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Commande /start - Message de bienvenue."""
    user = update.effective_user
    first_name = user.first_name if user.first_name else "stagiaire"
    
    welcome_message = (
        f"👋 Bonjour {first_name} !\n\n"
        "Je suis votre **Coach IA Formateur**, votre assistant personnel pour la formation certifiante "
        "**\"Intégrer l'IA dans les missions du consultant formateur\"** 🎓\n\n"
        "Je suis là pour vous aider à :\n"
        "• Comprendre les concepts du cours\n"
        "• Répondre à vos questions sur les 6 modules\n"
        "• Vous guider dans la pratique des outils IA\n"
        "• Préparer votre certification\n\n"
        "📚 **Les 6 modules de votre formation :**\n"
        "1️⃣ Introduction à l'IA et ses applications\n"
        "2️⃣ Conception de parcours pédagogiques\n"
        "3️⃣ Automatisation des processus\n"
        "4️⃣ Animation et évaluation avec l'IA\n"
        "5️⃣ Contenus pédagogiques multimédias\n"
        "6️⃣ Veille technologique IA\n\n"
        "💬 Posez-moi vos questions librement ! Je suis là pour vous accompagner.\n\n"
        "Tapez /aide pour voir toutes les commandes disponibles."
    )
    
    await update.message.reply_text(welcome_message, parse_mode=ParseMode.MARKDOWN)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Commande /aide - Liste des commandes."""
    help_text = (
        "🤖 **Commandes disponibles :**\n\n"
        "/start - Message de bienvenue\n"
        "/aide - Afficher cette aide\n"
        "/modules - Voir la liste des modules\n"
        "/module1 - Questions sur le Module 1 (Introduction IA)\n"
        "/module2 - Questions sur le Module 2 (Conception parcours)\n"
        "/module3 - Questions sur le Module 3 (Automatisation)\n"
        "/module4 - Questions sur le Module 4 (Animation)\n"
        "/module5 - Questions sur le Module 5 (Multimédia)\n"
        "/module6 - Questions sur le Module 6 (Veille IA)\n"
        "/certification - Infos sur la certification\n"
        "/reset - Réinitialiser la conversation\n\n"
        "💡 Ou posez simplement votre question directement !"
    )
    await update.message.reply_text(help_text, parse_mode=ParseMode.MARKDOWN)


async def modules_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Commande /modules - Liste des modules."""
    modules_text = (
        "📚 **Les 6 modules de votre formation certifiante :**\n\n"
        "**Module 1** - Introduction à l'IA et ses applications en formation\n"
        "_Comprendre l'IAG, paramétrer son compte, l'art du prompt, éthique et réglementation_\n\n"
        "**Module 2** - Conception de parcours pédagogiques personnalisés\n"
        "_Analyse du besoin, programme de formation, charte graphique, PowerPoint avec l'IA_\n\n"
        "**Module 3** - Automatisation des processus de formation\n"
        "_Assistants IA, Make, n8n, automatisation avancée_\n\n"
        "**Module 4** - Animation de formations avec l'IA et évaluations\n"
        "_Brainstorming, jeux de rôle, QCM, enquêtes de satisfaction_\n\n"
        "**Module 5** - Création de contenus pédagogiques multimédias\n"
        "_Pages web, podcasts, vidéos flash, microlearning, robot SAV_\n\n"
        "**Module 6** - Veille technologique IA\n"
        "_Influenceurs IA, newsletters, automatisation de la veille avec Make_\n\n"
        "Sur quel module avez-vous des questions ? 🎯"
    )
    await update.message.reply_text(modules_text, parse_mode=ParseMode.MARKDOWN)


async def module_command(update: Update, context: ContextTypes.DEFAULT_TYPE, module_num: int) -> None:
    """Commande générique pour un module spécifique."""
    module_descriptions = {
        1: ("Introduction à l'IA et ses applications en formation",
            "Que souhaitez-vous savoir sur ce module ? Vous pouvez me poser des questions sur : l'IAG (Intelligence Artificielle Générative), ChatGPT, l'art du prompt, les biais et hallucinations, l'éthique de l'IA, etc."),
        2: ("Conception de parcours pédagogiques personnalisés",
            "Posez-moi vos questions sur : l'analyse du besoin, la construction de programmes de formation, le livret stagiaire, la charte graphique, la création d'images, les présentations PowerPoint avec l'IA, etc."),
        3: ("Automatisation des processus de formation",
            "Quelles questions avez-vous sur : la création d'assistants IA, les GPTs personnalisés, Make, n8n, l'automatisation des attestations et programmes de formation, etc. ?"),
        4: ("Animation de formations avec l'IA et évaluations des acquis",
            "Je peux vous aider sur : le brainstorming avec l'IA, les jeux de rôle pédagogiques, la création de QCM, les enquêtes de satisfaction, les applications IA pour la formation, etc."),
        5: ("Création de contenus pédagogiques multimédias",
            "Des questions sur : la création de pages web de formation, les podcasts, les vidéos flash multilingues, les microlearnings, les robots SAV post-formation, etc. ?"),
        6: ("Veille technologique IA",
            "Posez vos questions sur : les influenceurs IA à suivre, la veille avec ChatGPT, le résumé de newsletters et vidéos YouTube, l'automatisation de la veille avec Make, etc."),
    }
    
    title, prompt = module_descriptions.get(module_num, ("Module inconnu", ""))
    message = f"🎯 **Module {module_num} : {title}**\n\n{prompt}"
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
    """Commande /certification - Infos sur la certification."""
    cert_text = (
        "🏆 **Votre certification IA**\n\n"
        "Cette formation mène à une **certification professionnelle** reconnue.\n\n"
        "**Comment préparer votre certification :**\n"
        "• Mettez en pratique les exercices sur vos propres cas métiers\n"
        "• Construisez votre dossier professionnel au fil de l'eau\n"
        "• Récupérez les exercices réalisés dans chaque module\n"
        "• Consultez le modèle de dossier dans votre espace extranet\n\n"
        "**Conseil clé :** Travaillez sur vos propres offres et cas réels, pas sur des cas fictifs !\n\n"
        "Avez-vous des questions spécifiques sur la préparation de votre dossier de certification ? 📝"
    )
    await update.message.reply_text(cert_text, parse_mode=ParseMode.MARKDOWN)


async def reset_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Commande /reset - Réinitialise la conversation."""
    context.user_data.clear()
    await update.message.reply_text(
        "🔄 Conversation réinitialisée ! Posez-moi votre prochaine question.",
        parse_mode=ParseMode.MARKDOWN,
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Gère les messages texte des utilisateurs."""
    user = update.effective_user
    question = update.message.text.strip()
    
    if not question:
        return
    
    logger.info(f"Question de {user.first_name} (ID: {user.id}): {question[:100]}")
    
    # Indicateur de frappe
    await update.message.chat.send_action(ChatAction.TYPING)
    
    try:
        # 1. Récupérer le contexte pertinent
        context_text = retrieve_context(question)
        
        # 2. Générer la réponse
        response = generate_response(question, context_text)
        
        # 3. Envoyer la réponse
        # Telegram limite les messages à 4096 caractères
        if len(response) > 4000:
            # Découper en plusieurs messages
            parts = [response[i:i+4000] for i in range(0, len(response), 4000)]
            for part in parts:
                await update.message.reply_text(part, parse_mode=ParseMode.MARKDOWN)
        else:
            await update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN)
        
        logger.info(f"Réponse envoyée à {user.first_name} ({len(response)} caractères)")
        
    except Exception as e:
        logger.error(f"Erreur lors du traitement de la question: {e}", exc_info=True)
        error_message = (
            "⚠️ Désolé, j'ai rencontré une difficulté technique. "
            "Veuillez réessayer dans quelques instants ou reformuler votre question."
        )
        await update.message.reply_text(error_message)


async def handle_non_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Gère les messages non-texte (images, fichiers, etc.)."""
    await update.message.reply_text(
        "📝 Je suis un coach textuel ! Pour l'instant, je ne peux traiter que des questions écrites. "
        "Posez-moi votre question en texte et je ferai de mon mieux pour vous aider. 😊"
    )


# ─── Démarrage du bot ─────────────────────────────────────────────────────────

async def post_init(application: Application) -> None:
    """Configure les commandes du bot après initialisation."""
    commands = [
        BotCommand("start", "Démarrer le bot et voir le message de bienvenue"),
        BotCommand("aide", "Voir toutes les commandes disponibles"),
        BotCommand("modules", "Liste des 6 modules de la formation"),
        BotCommand("module1", "Questions sur le Module 1 - Introduction à l'IA"),
        BotCommand("module2", "Questions sur le Module 2 - Conception de parcours"),
        BotCommand("module3", "Questions sur le Module 3 - Automatisation"),
        BotCommand("module4", "Questions sur le Module 4 - Animation et évaluation"),
        BotCommand("module5", "Questions sur le Module 5 - Contenus multimédias"),
        BotCommand("module6", "Questions sur le Module 6 - Veille IA"),
        BotCommand("certification", "Infos sur la certification"),
        BotCommand("reset", "Réinitialiser la conversation"),
    ]
    await application.bot.set_my_commands(commands)
    logger.info("Commandes du bot configurées.")


def main() -> None:
    """Point d'entrée principal du bot."""
    logger.info("=== Démarrage du Bot Telegram Coach Formateur IA ===")
    logger.info(f"Démarré le : {datetime.now().strftime('%d/%m/%Y à %H:%M:%S')}")
    
    # Créer l'application avec timeout augmenté
    request = HTTPXRequest(
        connection_pool_size=8,
        connect_timeout=30.0,
        read_timeout=30.0,
        write_timeout=30.0,
        pool_timeout=30.0,
    )
    application = (
        Application.builder()
        .token(TELEGRAM_TOKEN)
        .request(request)
        .post_init(post_init)
        .build()
    )
    
    # Enregistrer les gestionnaires de commandes
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("aide", help_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("modules", modules_command))
    application.add_handler(CommandHandler("module1", module1_command))
    application.add_handler(CommandHandler("module2", module2_command))
    application.add_handler(CommandHandler("module3", module3_command))
    application.add_handler(CommandHandler("module4", module4_command))
    application.add_handler(CommandHandler("module5", module5_command))
    application.add_handler(CommandHandler("module6", module6_command))
    application.add_handler(CommandHandler("certification", certification_command))
    application.add_handler(CommandHandler("reset", reset_command))
    
    # Gestionnaire pour les messages texte
    application.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message)
    )
    
    # Gestionnaire pour les messages non-texte
    application.add_handler(
        MessageHandler(~filters.TEXT, handle_non_text)
    )
    
    # Lancer le bot en mode polling
    logger.info("Bot en écoute... (Ctrl+C pour arrêter)")
    application.run_polling(
        allowed_updates=Update.ALL_TYPES,
        drop_pending_updates=True,
    )


if __name__ == "__main__":
    main()

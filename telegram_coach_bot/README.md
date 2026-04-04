# 🤖 Agent IA Coach Formateur - Bot Telegram

Bot Telegram intelligent basé sur une architecture **RAG (Retrieval-Augmented Generation)** pour accompagner les stagiaires de la formation certifiante **"Intégrer l'IA dans les missions du consultant formateur"**.

## 🏗️ Architecture

```
Stagiaire → Telegram → Bot Python → RAG Engine → Réponse pédagogique
                                        ↓
                              [Base vectorielle FAISS]
                              [Livret de formation PDF]
                                        ↓
                              [LLM GPT-4.1-mini via OpenAI]
```

## 📋 Prérequis

- Python 3.11+
- Token Telegram Bot (obtenu via @BotFather)
- Clé API OpenAI (`OPENAI_API_KEY` en variable d'environnement)
- Le fichier PDF du livret de formation

## 🚀 Installation

### 1. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 2. Construire la base de connaissances

```bash
python build_knowledge_base.py
```

> Cette étape télécharge le modèle d'embeddings multilingue (~470 Mo) et indexe le livret de formation.

### 3. Configurer les variables

Dans `bot.py`, vérifiez/modifiez :
- `TELEGRAM_TOKEN` : votre token BotFather
- `PDF_PATH` dans `build_knowledge_base.py` : chemin vers votre PDF

### 4. Démarrer le bot

```bash
bash start_bot.sh
# ou directement :
python bot.py
```

## 📚 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `/start` | Message de bienvenue |
| `/aide` | Liste des commandes |
| `/modules` | Vue d'ensemble des 6 modules |
| `/module1` à `/module6` | Accès direct à chaque module |
| `/certification` | Infos sur la certification |
| `/reset` | Réinitialiser la conversation |

## 🔧 Fichiers du projet

| Fichier | Description |
|---------|-------------|
| `bot.py` | Code principal du bot Telegram |
| `build_knowledge_base.py` | Script de construction de l'index vectoriel |
| `start_bot.sh` | Script de démarrage en arrière-plan |
| `stop_bot.sh` | Script d'arrêt du bot |
| `requirements.txt` | Dépendances Python |
| `vector_store/` | Base de connaissances vectorielle (générée) |

## 🧠 Fonctionnement du RAG

1. **Indexation** : Le livret PDF est découpé en 290 chunks de ~800 caractères
2. **Embeddings** : Chaque chunk est transformé en vecteur via `paraphrase-multilingual-MiniLM-L12-v2`
3. **Recherche** : Pour chaque question, les 5 passages les plus pertinents sont récupérés
4. **Génération** : Le LLM génère une réponse pédagogique basée sur ces passages

## 📝 Ajouter de nouveaux documents

Pour enrichir la base de connaissances :
1. Ajoutez vos PDF dans le répertoire du projet
2. Modifiez `build_knowledge_base.py` pour inclure les nouveaux fichiers
3. Relancez `python build_knowledge_base.py`
4. Redémarrez le bot

## 🔒 Sécurité

- Ne partagez jamais votre token Telegram publiquement
- Stockez `OPENAI_API_KEY` en variable d'environnement, pas dans le code
- Le fichier `vector_store/` contient vos données de formation, ne le partagez pas

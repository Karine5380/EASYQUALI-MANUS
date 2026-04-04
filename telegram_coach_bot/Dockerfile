# Image Python légère
FROM python:3.11-slim

# Variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copier et installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY bot_webhook.py .
COPY build_knowledge_base.py .

# Copier la base de connaissances vectorielle pré-construite
COPY vector_store/ ./vector_store/

# Exposer le port
EXPOSE $PORT

# Commande de démarrage
CMD uvicorn bot_webhook:app --host 0.0.0.0 --port $PORT

#!/bin/bash
# Script de démarrage du Bot Telegram Coach Formateur IA

BOT_DIR="/home/ubuntu/telegram_coach_bot"
LOG_FILE="$BOT_DIR/bot.log"
PID_FILE="$BOT_DIR/bot.pid"

echo "=== Démarrage du Bot Telegram Coach Formateur IA ==="
echo "Répertoire : $BOT_DIR"
echo "Log : $LOG_FILE"

# Vérifier si le bot tourne déjà
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo "Le bot tourne déjà (PID: $OLD_PID). Arrêtez-le d'abord avec stop_bot.sh"
        exit 1
    else
        rm -f "$PID_FILE"
    fi
fi

# Démarrer le bot en arrière-plan
cd "$BOT_DIR"
nohup python3.11 bot.py >> "$LOG_FILE" 2>&1 &
BOT_PID=$!
echo $BOT_PID > "$PID_FILE"

echo "Bot démarré avec PID: $BOT_PID"
echo "Pour voir les logs : tail -f $LOG_FILE"
echo "Pour arrêter le bot : bash $BOT_DIR/stop_bot.sh"

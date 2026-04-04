#!/bin/bash
# Script d'arrêt du Bot Telegram Coach Formateur IA

BOT_DIR="/home/ubuntu/telegram_coach_bot"
PID_FILE="$BOT_DIR/bot.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
        echo "Arrêt du bot (PID: $PID)..."
        kill "$PID"
        rm -f "$PID_FILE"
        echo "Bot arrêté."
    else
        echo "Le bot n'est pas en cours d'exécution."
        rm -f "$PID_FILE"
    fi
else
    echo "Aucun fichier PID trouvé. Le bot n'est peut-être pas lancé."
    # Tenter de tuer par nom de processus
    pkill -f "python3.11 bot.py" && echo "Processus tué." || echo "Aucun processus trouvé."
fi

# 🚀 Guide de Déploiement du Bot Telegram sur Render

Ce guide vous explique comment déployer votre Agent IA Coach Formateur sur Render.com pour qu'il soit disponible 24h/24 et 7j/7, de manière totalement gratuite.

Tout le code est déjà prêt et configuré sur votre dépôt GitHub `Karine5380/EASYQUALI-MANUS`. Il ne vous reste plus qu'à connecter Render à ce dépôt.

---

## Étape 1 : Créer le Web Service sur Render

1. Connectez-vous à votre tableau de bord Render : [https://dashboard.render.com/](https://dashboard.render.com/)
2. En haut à droite, cliquez sur le bouton **New** puis sélectionnez **Web Service**.
3. Dans la section "Connect a repository", vous devriez voir votre dépôt GitHub `Karine5380/EASYQUALI-MANUS`.
   - *Si vous ne le voyez pas, cliquez sur "Connect account" sous GitHub sur le côté droit pour lier votre compte.*
4. Cliquez sur le bouton **Connect** à côté de `Karine5380/EASYQUALI-MANUS`.

---

## Étape 2 : Configurer le Web Service

Remplissez le formulaire avec les informations suivantes :

- **Name** : `coach-formateur-ia-bot` (ou le nom de votre choix)
- **Region** : Laissez par défaut (ex: Frankfurt ou Oregon)
- **Branch** : `main`
- **Root Directory** : `telegram_coach_bot` *(⚠️ Très important !)*
- **Runtime** : `Docker`
- **Instance Type** : Laissez sur `Free` (Gratuit)

---

## Étape 3 : Ajouter les Variables d'Environnement (Secrets)

Faites défiler vers le bas jusqu'à la section **Environment Variables** et cliquez sur **Add Environment Variable**.

Ajoutez les 3 variables suivantes :

1. **Première variable :**
   - Key : `TELEGRAM_TOKEN`
   - Value : `8609866499:AAGThZ1Em0KdO5nCIwoCxJ0f0hepDrqxNuk`

2. **Deuxième variable :**
   - Key : `OPENAI_API_KEY`
   - Value : *(Collez ici votre clé API OpenAI commençant par `sk-...`)*

3. **Troisième variable :**
   - Key : `WEBHOOK_URL`
   - Value : *(Laissez vide pour l'instant, nous allons la remplir à l'étape suivante)*

Cliquez sur le bouton **Create Web Service** tout en bas.

---

## Étape 4 : Configurer l'URL du Webhook

1. Une fois le service créé, vous arriverez sur la page de votre bot.
2. En haut à gauche, sous le nom de votre bot, vous verrez une URL générée par Render (ex: `https://coach-formateur-ia-bot.onrender.com`). **Copiez cette URL**.
3. Allez dans l'onglet **Environment** dans le menu de gauche.
4. Trouvez la variable `WEBHOOK_URL` que vous aviez laissée vide.
5. Cliquez sur **Edit** et collez l'URL que vous venez de copier (sans le `/` à la fin).
6. Cliquez sur **Save Changes**.

Render va automatiquement redémarrer votre bot avec la nouvelle configuration.

---

## Étape 5 : C'est terminé ! 🎉

Attendez quelques minutes que le déploiement se termine (vous verrez des logs défiler, puis un message vert "Live").

Votre bot est maintenant hébergé dans le cloud ! Vous pouvez aller sur Telegram et lui parler, il vous répondra 24h/24, même quand votre ordinateur est éteint.

### En cas de problème :
Si le bot ne répond pas sur Telegram, vérifiez l'onglet **Logs** sur Render pour voir s'il y a des erreurs. Assurez-vous que la clé API OpenAI est correcte et que vous avez bien mis `telegram_coach_bot` dans le champ "Root Directory".

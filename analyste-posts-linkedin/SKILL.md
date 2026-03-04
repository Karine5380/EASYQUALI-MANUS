---
name: analyste-posts-linkedin
description: Analyse approfondie de posts LinkedIn (texte, photos, carrousels, vidéos, infographies) et production d'un rapport d'amélioration détaillé avec conseils actionnables, scoring par dimension, estimation du nombre optimal de publications et plan d'action priorisé. Basé sur les meilleures pratiques LinkedIn 2026 (algorithme Depth Score, formats natifs, fréquence, pénalités). Utiliser pour auditer un profil LinkedIn, analyser un ou plusieurs posts, identifier les pénalités algorithmiques, ou produire un rapport de recommandations pour augmenter la portée et l'engagement.
---

# Analyste Posts LinkedIn 2026

Skill d'audit et d'amélioration de contenu LinkedIn basé sur les meilleures pratiques 2026.

## Workflow d'analyse

L'analyse se déroule en 4 étapes séquentielles :

1. **Collecter** les posts à analyser (URL, captures d'écran, texte fourni)
2. **Analyser** chaque post selon les grilles de critères 2026
3. **Scorer** chaque dimension (voir grille dans `references/bonnes-pratiques-2026.md`)
4. **Produire** le rapport en suivant le template `templates/rapport-analyse-linkedin.md`

## Entrées acceptées

L'utilisateur peut fournir :
- URL(s) de post(s) LinkedIn → naviguer pour extraire le contenu
- Captures d'écran de posts → analyser visuellement
- Texte brut de posts collé dans le chat
- URL d'un profil LinkedIn → analyser les N derniers posts visibles
- Description textuelle d'une pratique → évaluer par rapport aux critères 2026

## Étape 1 : Collecte et inventaire

Pour chaque post fourni, noter :
- Format (texte, photo, carrousel, vidéo, infographie, document)
- Date de publication (si disponible)
- Métriques visibles (likes, commentaires, partages, impressions)
- Présence de liens externes, hashtags, mentions

Construire un tableau d'inventaire avant d'analyser.

## Étape 2 : Analyse par format

**Lire `references/bonnes-pratiques-2026.md` avant d'analyser** pour appliquer les critères corrects.

### Analyse universelle (tous formats)

Pour chaque post, évaluer sur 10 :
- **Hook** : Les 150 premiers caractères arrêtent-ils le scroll ? (curiosity gap, contrarian, vulnérabilité, chiffre fort)
- **Valeur immédiate** : L'insight est-il livré sans clic externe requis ?
- **Profondeur** : Y a-t-il des données, frameworks, exemples concrets ?
- **CTA / Engagement** : Y a-t-il une question ouverte ou invitation à commenter ?
- **Cohérence thématique** : Le post s'inscrit-il dans des piliers clairs ?
- **Pénalités** : Détecter liens externes dans le corps, engagement bait, hashtags excessifs
- **Qualité visuelle** : Lisibilité mobile, charte graphique, authenticité

### Analyse spécifique par format

**Carrousel (PDF)**
- Nombre de slides (optimal : 6-9)
- Structure hook → valeur → CTA
- Texte par slide (max 3-5 lignes)
- Cohérence visuelle entre slides
- Taille recommandée : 1080×1080 px ou 1920×1080 px

**Vidéo native**
- Durée (optimal : <30s ; acceptable : <90s)
- Sous-titres présents ? (obligatoire en 2026)
- Branding dans les 4 premières secondes ?
- Upload natif vs lien externe (YouTube = pénalisé)

**Photo / Image unique**
- Authenticité (photo réelle > stock photo)
- Résolution et qualité (1200×627 px recommandé)
- Cohérence avec le message texte

**Infographie**
- Lisibilité mobile (police >16px, contraste élevé)
- Hiérarchie visuelle claire
- Densité d'information équilibrée

**Texte seul**
- Longueur (optimal : 1 200-1 800 caractères)
- Sauts de ligne pour la lisibilité
- Question de discussion en fin de post

## Étape 3 : Analyse de la fréquence

Calculer et comparer aux benchmarks 2026 :

| Objectif | Fréquence cible | Publications/mois |
|---|---|---|
| Maintien présence | 1-2/semaine | 4-8/mois |
| Croissance audience | 3-5/semaine | 12-20/mois |
| Croissance agressive | 5+/semaine | 20-25/mois |

Poster 2-5 fois/semaine = **+1 182 impressions/post** en moyenne vs 1 fois/semaine.

Créneaux optimaux : **Mardi-Jeudi, 7h30-8h30 ou 11h-13h** (heure locale audience).
Publier 30-60 minutes AVANT le pic d'activité.

## Étape 4 : Production du rapport

Utiliser le template `templates/rapport-analyse-linkedin.md` comme base.

**Structure obligatoire du rapport :**
1. Synthèse exécutive + Score global /100
2. Analyse de la fréquence de publication (situation actuelle vs benchmark + estimation gains)
3. Analyse par format de contenu (tableau de répartition + analyse détaillée)
4. Analyse de la qualité rédactionnelle (hooks, valeur, CTA)
5. Détection des pénalités algorithmiques (tableau complet)
6. Plan d'amélioration priorisé (immédiat / moyen terme / structurel)
7. Estimation du potentiel de croissance à 3 mois
8. Ressources et prochaines étapes

**Calcul du score global /100 :**
- Hook / Accroche : /10 × 20% = /20
- Valeur immédiate : /10 × 15% = /15
- Profondeur et substance : /10 × 15% = /15
- Incitation à l'engagement : /10 × 10% = /10
- Cohérence thématique : /10 × 10% = /10
- Absence de pénalités : /10 × 10% = /10
- Qualité visuelle : /10 × 10% = /10
- Fréquence et régularité : /10 × 10% = /10
- **Total : /100**

## Règles de qualité du rapport

- Chaque recommandation doit être **concrète et actionnable** (pas de conseil vague)
- Toujours inclure un **exemple de reformulation** pour les hooks à améliorer
- Toujours chiffrer le **potentiel de gain** (impressions, engagement estimé)
- Inclure l'**estimation du nombre de publications recommandé** par semaine ET par mois
- Identifier clairement les **pénalités algorithmiques actives** avec leur impact estimé
- Le rapport doit être livré en **Markdown** (`.md`) ou **PDF** selon la demande

## Références

- Référentiel complet des bonnes pratiques 2026 : `references/bonnes-pratiques-2026.md`
  → Lire pour : grilles de notation détaillées, spécifications techniques, tableau des pénalités
- Template de rapport : `templates/rapport-analyse-linkedin.md`
  → Utiliser comme base structurelle pour tout rapport d'analyse

---
name: linkedin-post-generator
description: Génère des posts LinkedIn variés et engageants (storytelling, conseils, enseignement) de 300-500 mots, basés sur les meilleures pratiques de 2026. Inclut désormais un workflow complet en 3 phases : (1) Analyse approfondie du post existant et de ses visuels (texte, photo, carrousel, vidéo, infographie) avec scoring par dimension, (2) Rapport d'amélioration détaillé avec conseils actionnables, estimation de la fréquence optimale de publication et plan d'action priorisé, (3) Rédaction du post LinkedIn final optimisé et du prompt visuel. Conforme aux meilleures pratiques LinkedIn 2026 (algorithme Depth Score, formats natifs, pénalités, fréquence).
---

# LinkedIn Post Generator — Analyse, Rapport & Rédaction

Ce skill couvre le cycle complet de création et d'optimisation d'un post LinkedIn : de l'analyse critique du contenu existant jusqu'à la rédaction du post final publié, en passant par un rapport d'amélioration structuré et scoré.

---

## Vue d'ensemble du workflow

Le workflow se déroule en **3 phases séquentielles obligatoires**, quelle que soit la demande de l'utilisateur :

**Phase A — Analyse** : Auditer le post existant (texte + visuels) selon les critères 2026.
**Phase B — Rapport** : Produire le rapport d'amélioration scoré avec plan d'action et estimation de fréquence.
**Phase C — Rédaction** : Rédiger le post final optimisé et le prompt visuel.

> Si l'utilisateur fournit un post existant à améliorer, les 3 phases sont obligatoires dans l'ordre.
> Si l'utilisateur demande la création d'un post from scratch (sans contenu existant), démarrer directement à la Phase C — Étape C1.

---

## PHASE A — Analyse du post et des visuels

### Étape A1 : Collecte et inventaire

Avant toute analyse, inventorier le contenu fourni par l'utilisateur :
- Format du post (texte seul, photo, carrousel PDF, vidéo native, infographie)
- Longueur du texte (nombre de caractères)
- Présence de liens externes dans le corps du post
- Nombre et pertinence des hashtags
- Métriques visibles si disponibles (likes, commentaires, impressions)

Pour les carrousels, noter : nombre de slides, format (carré 1080×1080 ou paysage), présence du logo de marque.

### Étape A2 : Analyse universelle — tous formats

**Lire `references/linkedin_best_practices_2026.md` avant d'analyser.**

Évaluer chaque dimension sur 10 :

- **Hook** : Les 150 premiers caractères arrêtent-ils le scroll ? (curiosity gap, chiffre fort, vulnérabilité, contrarian)
- **Valeur immédiate** : L'insight est-il livré sans clic externe requis ?
- **Profondeur et substance** : Y a-t-il des données, frameworks, exemples concrets ?
- **Incitation à l'engagement** : Y a-t-il une question ouverte ou invitation à commenter en fin de post ?
- **Cohérence thématique** : Le post s'inscrit-il dans des piliers éditoriaux clairs ?
- **Absence de pénalités** : Détecter liens externes dans le corps, engagement bait, hashtags excessifs (>5), pods
- **Qualité visuelle** : Lisibilité mobile, charte graphique, authenticité
- **Fréquence et régularité** : Le rythme de publication est-il cohérent avec les objectifs ?

### Étape A3 : Analyse visuelle slide par slide (carrousels — OBLIGATOIRE)

Pour chaque slide du carrousel, évaluer et noter sur 10 :

- **Typographie** : Accents, apostrophes, majuscules, lisibilité de la police
- **Fautes visibles** : Doublons de mots, coupures incorrectes, erreurs de frappe
- **Hiérarchie visuelle** : Titre > sous-titre > corps > phrase d'impact
- **Cohérence de charte** : Palette de couleurs, police, fond cohérents entre slides
- **Logo de marque** : Présence/absence sur chaque slide (obligatoire sur slide 01 et slide CTA)
- **Numérotation** : Cohérence des numéros de slide et des codes (ex : C1, C2, C6 — conserver si codes de certification)
- **Slide de couverture (01)** : Hook fort, curiosity gap, voix personnelle
- **Slide de données** : Chiffres sourcés, lisibilité, hiérarchie chiffre/contexte
- **Slides de valeur** : Contenu actionnable, pas de conseil générique
- **Slide CTA finale** : Un seul CTA clair, phrase mémorisable, pas de doublon

**Corrections à signaler en priorité absolue :**
1. Doublon de mots (ex : "les les casquettes") → correction immédiate
2. Apostrophes absentes sur les titres principaux → impact professionnel fort
3. Accents manquants sur les verbes (réalisé, facturés, automatisé) → correction orthographique
4. Absence de logo de marque → ajouter sur slide 01 et slide CTA au minimum
5. Incohérence de numérotation → corriger ou justifier (ex : codes de compétences certification à conserver)

### Étape A4 : Détection des pénalités algorithmiques

Identifier chaque pénalité active et son impact estimé :

- **Lien externe dans le corps du post** → -60 % de portée organique (à déplacer en premier commentaire)
- **Hashtags dans les commentaires** → non pris en compte par l'algorithme (à remettre dans le corps)
- **Plus de 5 hashtags** → signal de spam potentiel
- **Engagement bait explicite** ("Likez si vous êtes d'accord") → pénalité algorithmique directe
- **Repost d'article externe** → portée réduite vs contenu natif
- **Vidéo YouTube ou lien externe vers vidéo** → pénalisé vs upload natif LinkedIn

---

## PHASE B — Rapport d'amélioration

### Étape B1 : Calcul du score global /100

Appliquer les pondérations suivantes :

- Hook / Accroche : note /10 × 20 % = /20
- Valeur immédiate : note /10 × 15 % = /15
- Profondeur et substance : note /10 × 15 % = /15
- Incitation à l'engagement : note /10 × 10 % = /10
- Cohérence thématique : note /10 × 10 % = /10
- Absence de pénalités : note /10 × 10 % = /10
- Qualité visuelle : note /10 × 10 % = /10
- Fréquence et régularité : note /10 × 10 % = /10
- **Total : /100**

### Étape B2 : Estimation de la fréquence optimale de publication

Calculer et comparer aux benchmarks 2026 :

- **Maintien de présence** : 1-2 posts/semaine → 4-8 publications/mois
- **Croissance d'audience** : 3-5 posts/semaine → 12-20 publications/mois (recommandé pour un OF en développement)
- **Croissance agressive** : 5+ posts/semaine → 20-25 publications/mois

Poster 2-5 fois/semaine génère en moyenne **+1 182 impressions supplémentaires par post** vs 1 fois/semaine.

Créneaux optimaux : **Mardi-Jeudi, 7h30-8h30 ou 11h-13h** (heure locale de l'audience cible).
Publier 30 à 60 minutes AVANT le pic d'activité pour maximiser la distribution initiale.

**Toujours fournir une recommandation chiffrée** : "Vous publiez actuellement X fois/semaine. Pour atteindre votre objectif de [croissance/visibilité], la fréquence recommandée est de Y posts/semaine, soit Z publications/mois."

### Étape B3 : Structure du rapport livré dans le chat

Le rapport est livré **directement dans le chat** (sauf demande explicite de fichier) et suit cette structure :

1. **Score global /100** avec interprétation synthétique (2-3 lignes)
2. **Analyse slide par slide** (pour les carrousels) — tableau avec score /10 par slide et corrections prioritaires
3. **Analyse détaillée par dimension** — pour chaque dimension, ce qui fonctionne, ce qui manque, exemple de reformulation
4. **Pénalités algorithmiques actives** — liste avec impact estimé et correction recommandée
5. **Estimation de la fréquence optimale** — situation actuelle vs benchmark + recommandation chiffrée
6. **Plan d'action priorisé** en 3 horizons :
   - Immédiat (avant publication) : corrections critiques
   - Court terme (prochaine version) : améliorations de contenu
   - Structurel (mois 2-3) : évolution du format et du calendrier éditorial
7. **Estimation du potentiel de croissance à 3 mois** si les recommandations sont appliquées

**Règles de qualité du rapport :**
- Chaque recommandation doit être concrète et actionnable (jamais de conseil vague)
- Toujours inclure un exemple de reformulation pour les hooks à améliorer
- Toujours chiffrer le potentiel de gain (impressions, engagement estimé)
- Pour les carrousels : inclure le tableau d'analyse slide par slide

---

## PHASE C — Rédaction du post final et du visuel

### Étape C1 : Identifier le type de post

Si création from scratch, identifier parmi :
1. **Storytelling** : histoire personnelle ou étude de cas pour créer une connexion émotionnelle
2. **Conseil** : astuces pratiques et actionnables pour résoudre un problème spécifique
3. **Enseignement** : expliquer un concept, un framework ou une compétence de manière pédagogique

Utiliser le template correspondant dans `/templates/` :
- Storytelling → `storytelling_post_template.md`
- Conseil → `advice_post_template.md`
- Enseignement → `teaching_post_template.md`

### Étape C2 : Rédiger le post LinkedIn final optimisé

Intégrer impérativement les corrections issues du rapport (Phase B) et les éléments suivants :

1. **Hook repositionné** : chiffre fort ou phrase d'identification dans les 150 premiers caractères (visible avant "Voir plus")
2. **Lien externe retiré** du corps du post → à placer en premier commentaire après publication
3. **Question d'engagement** en dernier élément absolu du post (rien après)
4. **3 à 5 hashtags spécifiques** à la fin du corps du post (jamais en commentaire)
5. **Voix cohérente** ("je" ou "nous" — choisir et maintenir tout au long du post)
6. **Corrections des incohérences** de contenu (numérotations, chiffres contradictoires, fautes)
7. **Note de publication** : texte prêt à coller en premier commentaire (lien + CTA appel découverte)

**Structure recommandée pour un post accompagnant un carrousel :**
- Lignes 1-2 : Hook fort (chiffre ou phrase d'identification) — visible avant "Voir plus"
- Lignes 3-5 : Contexte personnel (storytelling court, 2-3 lignes)
- Lignes 6-8 : Annonce du contenu du carrousel ("Dans ce carrousel, je partage...")
- Lignes 9-10 : Invitation à swiper + question d'engagement
- Ligne 11 : Hashtags (3-5 spécifiques)
- **Longueur cible** : 800-1 200 caractères (le carrousel porte la valeur, le post est court)

**Structure recommandée pour un post texte seul :**
- Lignes 1-2 : Hook fort
- Lignes 3-10 : Développement (storytelling, conseils ou enseignement selon le type)
- Lignes 11-13 : Conclusion et transition vers la question
- Ligne 14 : Question d'engagement (dernier élément)
- Ligne 15 : Hashtags (3-5 spécifiques)
- **Longueur cible** : 1 200-1 800 caractères

### Étape C3 : Créer le prompt pour le visuel d'accompagnement

Chaque post doit être accompagné d'un prompt visuel. Lire `/references/visual_style_guide.md` puis :

1. Déterminer le format le plus pertinent (photo réaliste, carrousel, vidéo courte, infographie)
2. Rédiger un prompt incluant :
   - Le **sujet** du post
   - Le **style** (photo réaliste, moderne, épuré)
   - La **palette de couleurs** (dégradé violet-rose néon, dark navy)
   - La **composition** (humains en contexte professionnel, émotions positives)
   - L'**intégration naturelle du logo** Evolut'In Academy

**Exemple de prompt visuel :**
> "Créer une photo ultra-réaliste de style professionnel pour un post LinkedIn. Une formatrice (environ 40 ans, dynamique et souriante) anime un petit groupe de 3 professionnels dans un espace de coworking moderne et lumineux. Elle pointe un schéma sur un écran mural. L'ambiance est collaborative et positive. Intégrer subtilement le logo d'Evolut'In Academy sur un mug posé sur la table. La palette de couleurs doit inclure des touches de dégradé allant du violet (#8A2BE2) au rose néon (#FF00FF) dans l'éclairage d'ambiance, de manière élégante."

### Étape C4 : Livraison finale dans le chat

Fournir à l'utilisateur les éléments suivants dans cet ordre :

1. **Texte complet du post final** (corps du post, prêt à copier-coller)
2. **Note de publication** (texte du premier commentaire avec lien + CTA)
3. **Hashtags** (rappel des 3-5 hashtags à inclure dans le corps du post)
4. **Prompt visuel** (prompt détaillé pour la génération du visuel d'accompagnement)

---

## Guide des ressources

| Fichier | Description | Quand l'utiliser |
|---|---|---|
| `references/linkedin_best_practices_2026.md` | Référentiel complet : Depth Score, formats, fréquences, pénalités, grilles de notation | À chaque analyse (Phase A) |
| `references/visual_style_guide.md` | Charte graphique : couleurs, style, logo Evolut'In | Phase C — création du prompt visuel |
| `templates/storytelling_post_template.md` | Structure éprouvée pour posts storytelling | Phase C — post de type storytelling |
| `templates/advice_post_template.md` | Structure éprouvée pour posts conseils | Phase C — post de type conseil |
| `templates/teaching_post_template.md` | Structure éprouvée pour posts enseignement | Phase C — post de type enseignement |

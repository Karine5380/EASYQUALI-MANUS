---
name: linkedin-post-generator
description: Génère des posts LinkedIn variés et engageants (storytelling, conseils, enseignement, vente) de 300-500 mots, basés sur les meilleures pratiques de 2026. Intègre les frameworks SLAY et PAS, la règle des 8 mots, la stratégie d'autorité B2B 4-3-2-1, le workflow IA anti-slop, et la création d'un prompt pour un visuel d'accompagnement respectant la charte graphique (dégradé violet-rose néon). Ton professionnel, bienveillant et avec une pointe d'humour.
---

# LinkedIn Post Generator

Ce skill guide la création de posts LinkedIn professionnels et engageants, optimisés pour l'algorithme de 2026. Il couvre la rédaction du contenu (avec les frameworks SLAY et PAS), la stratégie de distribution (règle 4-3-2-1) et la création du prompt pour le visuel d'accompagnement.

## Workflow de Création

Suivre ces étapes pour générer un post complet et performant :

### Étape 1 : Comprendre la Demande

Identifier le sujet principal, l'objectif du post et le type de contenu souhaité par l'utilisateur parmi les quatre options suivantes :
1. **Storytelling (SLAY)** : Raconter une histoire personnelle ou une étude de cas pour créer une connexion émotionnelle et bâtir l'autorité. Utiliser le framework **SLAY**.
2. **Conseil** : Fournir des astuces pratiques et actionnables pour résoudre un problème spécifique.
3. **Enseignement** : Expliquer un concept, un framework ou une compétence de manière pédagogique.
4. **Vente directe (PAS)** : Convertir un prospect en client en activant un levier émotionnel fort. Utiliser le framework **PAS**.

### Étape 2 : Sélectionner et Utiliser le Framework et le Template Appropriés

En fonction du type de post identifié :

**Pour un post Storytelling**, utiliser le **Framework SLAY** :
- **(S) Story** : Raconter l'événement déclencheur (hier, ce matin, il y a 3 ans...).
- **(L) Lesson** : Extraire la leçon contre-intuitive ou inattendue.
- **(A) Actionable Advice** : Donner 3 piliers / étapes / tactiques concrètes et numérotées.
- **(Y) You** : Poser une question ouverte qui invite le lecteur à partager son expérience.

**Pour un post de Vente directe**, utiliser le **Framework PAS** :
- **(P) Problem** : Nommer le problème douloureux que ressent l'audience.
- **(A) Agitate** : Amplifier la douleur, montrer le coût de l'inaction.
- **(S) Solution** : Présenter la solution avec une preuve sociale chiffrée.

**Pour les posts Conseil et Enseignement**, utiliser les templates dans le dossier `/templates/` :
- Pour un post **Conseil**, utiliser `advice_post_template.md`.
- Pour un post **Enseignement**, utiliser `teaching_post_template.md`.

### Étape 3 : Consulter les Meilleures Pratiques 2026

Avant de rédiger, lire impérativement le fichier de recherche `/references/linkedin_best_practices_2026.md`. Ce document contient les données, statistiques, frameworks et stratégies à jour.

**Intégrer impérativement les éléments suivants dans la rédaction :**

1. **La Règle d'Or des 8 Mots** : Les deux premières lignes doivent faire **8 mots maximum**. C'est la limite physique avant le bouton "Voir plus" sur mobile (80% de la consommation). Un hook coupé = un post mort.
2. **Le Re-hook** : La deuxième ligne est la seconde chance. Être spécifique, pas mystérieux. Utiliser des **chiffres brutaux** ("60k MRR", "82% de chute") pour stopper le scan oculaire.
3. **Donner la valeur immédiatement** : Ne pas cacher l'essentiel à la fin. Prouver dès le début que l'on ne fait pas perdre de temps au lecteur.
4. **Structure F-Shape** : Alterner lignes courtes et blocs de 3 lignes, avec des espaces blancs. L'espace blanc est l'outil de rétention n°1 sur mobile.
5. **Expertise Monétisable** : Transformer le "Comment faire" (théorique) en "Comment j'ai fait" (autoritaire). Inclure des preuves sociales chiffrées.

### Étape 4 : Rédiger le Contenu du Post

En utilisant le framework ou template choisi et les informations du guide des meilleures pratiques, rédiger un post de **300 à 500 mots**. Le ton doit être professionnel, bienveillant, avec une touche d'humour léger. Personnaliser le contenu pour qu'il soit authentique et pertinent pour la cible (consultants, formateurs, dirigeants, etc.).

**Points de contrôle avant livraison :**
- [ ] Les 2 premières lignes font 8 mots maximum
- [ ] Un chiffre ou une métrique concrète est présent dans les 3 premières lignes (re-hook)
- [ ] La structure est aérée (F-Shape) avec des espaces blancs
- [ ] La valeur principale est donnée dès le début (pas cachée à la fin)
- [ ] Le post se termine par une question ouverte (appel à l'action)
- [ ] Le post correspond à l'un des 3 piliers de la règle 4-3-2-1 : Growth (Broad), Éducatif (Narrow), ou Sales (Niche)

### Étape 5 : Créer le Prompt pour le Visuel

Chaque post doit être accompagné d'un visuel. Pour cela, il faut générer un prompt détaillé pour un outil de génération d'images IA. Ce prompt doit impérativement respecter le guide de style visuel.

1. Lire le guide de style : `/references/visual_style_guide.md`.
2. Déterminer le format le plus pertinent (Photo réaliste, Carrousel, Vidéo courte).
3. Rédiger un prompt qui inclut :
   - Le **sujet** du post.
   - Le **style** (photo réaliste, moderne, épuré).
   - La **palette de couleurs** (dégradé violet-rose néon).
   - La **composition** (humains en contexte professionnel, émotions positives).
   - L'**intégration naturelle du logo** d'Evolut'In Academy.

#### Exemple de Prompt pour un Visuel

> "Créer une photo ultra-réaliste de style professionnel pour un post LinkedIn. Une formatrice (environ 40 ans, dynamique et souriante) anime un petit groupe de 3 professionnels dans un espace de coworking moderne et lumineux. Elle pointe un schéma sur un écran mural. L'ambiance est collaborative et positive. Intégrer subtilement le logo d'Evolut'In Academy sur un mug posé sur la table. La palette de couleurs doit inclure des touches de dégradé allant du violet (#8A2BE2) au rose néon (#FF00FF) dans l'éclairage d'ambiance ou sur l'écran, de manière élégante."

### Étape 6 : Livrer le Post Complet

Fournir à l'utilisateur les deux éléments finaux :
1. Le **texte complet du post**, incluant le contenu et le premier commentaire avec les 3 à 5 hashtags pertinents.
2. Le **prompt détaillé** pour la génération du visuel.

---

## Stratégie de Distribution : La Règle du 4-3-2-1

Lors de la création d'un planning de posts, appliquer systématiquement cette règle :

| Composante | Détail |
| :--- | :--- |
| **4 Posts par semaine** | Fréquence de frappe optimale (Lundi à Jeudi). Signale que votre temps est précieux. |
| **3 Piliers de contenu** | Growth (Broad/Large audience), TAM Éducatif (Narrow), Sales Niche (Conversion) |
| **2 Sessions d'engagement** | 15 min le matin + 15 min au moment de la publication (Lead Time critique) |
| **1 Objectif unique** | Chaque post vise une seule action : Lead, Follow, ou Mindshare |

### Le Concept Broad-Narrow-Niche

Pour maximiser la portée sans rester prisonnier d'une niche :
1. **Broad (Hook)** : Parle à tous les entrepreneurs (ex : "Mon business va franchir les 200k$/mois").
2. **Narrow (Body)** : Cible ceux qui détestent une contrainte spécifique (ex : "Zéro cold emails, zéro outbound").
3. **Niche (Tactics)** : Expertise pure pour les initiés (ex : "Voici comment j'utilise les transcriptions d'appels pour nourrir mon IA").

---

## Workflow IA Anti-Slop (Rappel)

Ne jamais demander à l'IA "écris-moi un post sur X". Lui donner de la **Spécificité Humaine** :

- **Transcription de Calls** : Extraire la leçon principale d'un transcript client et demander : "Rédige un post SLAY à partir de cette leçon".
- **Notes Vocales** : Enregistrer ses pensées brutes. C'est là que se trouve le "ton de voix" naturel.
- **Routine Lundi (30 min)** : Injecter les transcripts/notes de la semaine. Générer les 4 posts de la semaine en une seule session.

---

## Guide des Ressources

| Fichier/Dossier | Description | Quand l'utiliser |
| :--- | :--- | :--- |
| `/references/linkedin_best_practices_2026.md` | Synthèse complète des données, statistiques, frameworks SLAY/PAS, stratégie 4-3-2-1 et workflow anti-slop pour 2026. | **À chaque post.** Pour garantir l'optimisation et la performance. |
| `/references/visual_style_guide.md` | Charte graphique pour tous les visuels (couleurs, style, logo). | **À chaque post.** Pour la création du prompt visuel. |
| `/templates/` | Modèles de structure pour chaque type de post (storytelling, conseil, enseignement). | **Au début de la rédaction.** Pour choisir la bonne structure. |

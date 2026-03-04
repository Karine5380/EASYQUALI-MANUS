---
name: visuel-reseaux-sociaux
description: "Crée des visuels professionnels pour les réseaux sociaux (LinkedIn, Instagram, Facebook) en deux étapes : (1) génération d'un super prompt personnalisé à partir du contenu du post, du type de visuel souhaité (photo, vidéo, infographie, carrousel), des couleurs, du ton et du logo fourni, puis (2) création du visuel correspondant. Utiliser pour produire des photos, infographies ou carrousels engageants et cohérents avec la charte graphique d'un organisme."
---

# Visuel Réseaux Sociaux

Ce skill génère des visuels percutants pour accompagner des publications sur **LinkedIn, Instagram et Facebook**, en deux phases distinctes et séquentielles : la construction d'un super prompt, puis la génération du visuel.

## Vue d'ensemble du workflow

```
ÉTAPE 1 : Collecte des informations → ÉTAPE 2 : Génération du super prompt → ÉTAPE 3 : Validation → ÉTAPE 4 : Création du visuel
```

---

## ÉTAPE 1 — Collecte des informations

Avant toute génération, demander à l'utilisateur les éléments suivants (tous obligatoires) :

| Information | Description | Exemple |
|---|---|---|
| **Plateforme cible** | LinkedIn, Instagram ou Facebook | LinkedIn |
| **Contenu du post** | Le texte ou le sujet du post à illustrer | "5 erreurs à éviter lors d'un bilan de compétences" |
| **Type de visuel** | Photo, Infographie, Carrousel ou Vidéo | Carrousel |
| **Couleurs** | Palette principale et secondaire (codes hex si possible) | Violet #8B5CF6, Rose #EC4899 |
| **Ton** | Professionnel, bienveillant, dynamique, inspirant, etc. | Professionnel et bienveillant |
| **Logo** | Fichier image du logo à intégrer de manière subtile | `/path/to/logo.png` |

> **Si le logo n'est pas fourni**, utiliser le logo par défaut Evolut'In Academy disponible dans `/home/ubuntu/skills/evolutin-photo-generator/templates/logo-evolutin-academy.png`.

> **Si les couleurs ne sont pas précisées**, utiliser la palette Evolut'In Academy : violet `#8B5CF6` et rose/magenta `#EC4899`.

---

## ÉTAPE 2 — Génération du super prompt

Une fois toutes les informations collectées, construire un **super prompt ultra-détaillé** adapté au type de visuel demandé.

Consulter le fichier de référence `/home/ubuntu/skills/visuel-reseaux-sociaux/references/prompt-templates.md` pour les templates par type de visuel.

### Règles de construction du super prompt

1. **Décrire la scène ou la composition** avec précision (personnes, objets, arrière-plan, ambiance).
2. **Spécifier le style** : photoréaliste, moderne, épuré, lumineux.
3. **Intégrer les couleurs** de la charte graphique de manière cohérente (éclairage, décoration, éléments graphiques).
4. **Intégrer le logo de manière subtile** : jamais en filigrane, toujours de façon naturelle et contextuelle.
5. **Adapter le format** à la plateforme et au type de visuel.
6. **Préciser le ton émotionnel** : expressions des personnes, atmosphère générale.

### Méthodes d'intégration du logo (par ordre de préférence)

| Méthode | Description | Contexte idéal |
|---|---|---|
| **Écran** | Logo affiché sur un écran d'ordinateur, tablette ou TV | Formations, présentations, bureaux |
| **Objet** | Logo sur une tasse, carnet, stylo, badge, sac | Scènes de bureau, entretiens, ateliers |
| **Vêtement** | Logo brodé sur un polo, t-shirt ou veste | Équipe, événements, remises de diplôme |
| **Signalétique** | Logo sur un panneau, roll-up ou affiche en arrière-plan | Événements, salons, accueil |
| **Élément graphique** | Logo intégré dans un bandeau ou une slide de carrousel | Infographies, carrousels |

> **Règle absolue** : Jamais de filigrane. L'intégration doit sembler naturelle et contextuelle.

### Formats techniques par plateforme et type de visuel

| Plateforme | Type | Format recommandé |
|---|---|---|
| LinkedIn | Photo post | 1200×627 px (ratio 1.91:1) |
| LinkedIn | Carré | 1080×1080 px (ratio 1:1) |
| LinkedIn | Carrousel | 1080×1080 px par slide |
| Instagram | Post | 1080×1080 px (ratio 1:1) |
| Instagram | Portrait | 1080×1350 px (ratio 4:5) |
| Instagram | Story/Reel | 1080×1920 px (ratio 9:16) |
| Facebook | Post | 1200×630 px (ratio 1.91:1) |
| Facebook | Story | 1080×1920 px (ratio 9:16) |

### Structure du super prompt (template universel)

```
[SUJET] : [Description précise du sujet principal de l'image]
[SCÈNE] : [Description détaillée de la composition, des personnes, des objets et de l'arrière-plan]
[STYLE] : [Style artistique : photoréaliste / moderne / épuré / dynamique]
[COULEURS] : [Palette de couleurs avec codes hex, zones d'application]
[LOGO] : [Description du logo + méthode d'intégration choisie]
[TON] : [Atmosphère émotionnelle, expressions des personnes, ambiance générale]
[FORMAT] : [Dimensions en pixels et ratio]
[TECHNIQUE] : [Éclairage, profondeur de champ, composition, qualité]
```

### Présentation du super prompt à l'utilisateur

Présenter le super prompt dans un bloc de code Markdown clairement délimité, précédé d'une brève explication des choix effectués (scène, intégration du logo, format). Demander validation avant de passer à l'étape suivante.

---

## ÉTAPE 3 — Validation par l'utilisateur

Après présentation du super prompt :

- **Si l'utilisateur valide** → Passer immédiatement à l'Étape 4.
- **Si l'utilisateur demande des modifications** → Ajuster le super prompt selon ses retours, représenter le prompt corrigé et demander à nouveau validation.

---

## ÉTAPE 4 — Création du visuel

Une fois le super prompt validé, procéder à la génération du visuel selon le type demandé.

**Photo ou illustration unique ?** → Utiliser l'outil `generate` (mode génération d'image) avec le super prompt validé.

**Infographie ou carrousel ?** → Suivre ce workflow :

1. Décomposer le contenu du post en **sections claires** (titre, points clés, conclusion/CTA).
2. Pour chaque slide ou section, générer les éléments visuels individuellement via l'outil `generate`.
3. Assembler les slides dans un document structuré (HTML ou Markdown avec images).
4. Exporter au format adapté (PNG par slide, ou PDF pour carrousel LinkedIn).

**Vidéo courte ?** → Lire et suivre le workflow de la skill `video-generator`.

### Checklist avant livraison

- [ ] Le visuel correspond au contenu et au ton du post
- [ ] Les couleurs de la charte graphique sont respectées
- [ ] Le logo est intégré de manière subtile et naturelle (aucun filigrane)
- [ ] Le format est adapté à la plateforme cible
- [ ] La qualité est suffisante pour une publication professionnelle

### Livraison finale

Fournir à l'utilisateur :
1. Le **super prompt** utilisé (pour réutilisation future).
2. Le **visuel généré** (fichier image ou ensemble de slides).
3. Une **suggestion de légende** ou d'accroche visuelle si pertinent.

---

## Ressources

| Fichier | Description | Quand l'utiliser |
|---|---|---|
| `references/prompt-templates.md` | Templates de super prompts par type de visuel | À chaque génération de prompt |
| `references/platform-specs.md` | Spécifications techniques détaillées par plateforme | En cas de doute sur les formats |
| `templates/logo-evolutin-academy.png` | Logo par défaut si aucun logo fourni | Quand l'utilisateur n'a pas fourni de logo |

---
name: analyste-persona-apprenant
description: Analyse et création de plusieurs personas détaillés pour les apprentis d'un CFA. À partir d'un minimum d'informations (formation, secteur, niveau), génère automatiquement 3 à 5 fiches personas complètes, réalistes et actionnables, couvrant les dimensions démographiques, socio-culturelles, numériques, motivationnelles et comportementales. Permet à l'utilisateur de choisir le ou les personas les plus pertinents pour son projet.
---

# Skill : Analyste Multi-Personas Apprenant pour CFA

## Objectif

Cette compétence guide Manus pour créer **plusieurs personas d'apprentis** ultra-détaillés, réalistes et exploitables pour un Centre de Formation d'Apprentis (CFA) ou un Organisme de Formation. À partir d'un **minimum de 2 à 3 informations** fournies par l'utilisateur, Manus enrichit automatiquement les profils grâce à une recherche externe et produit **3 à 5 fiches personas distinctes**, couvrant la diversité réelle du public cible. L'utilisateur choisit ensuite le ou les personas à retenir.

---

## Workflow Séquentiel

Suivre impérativement ces étapes dans l'ordre.

### Étape 1 : Collecte minimale des informations initiales

Poser **3 questions maximum** à l'utilisateur pour définir le périmètre. L'objectif est de collecter le strict minimum pour lancer la génération. Ne pas bloquer sur des informations manquantes : Manus les inférera à l'étape suivante.

> **Questions à poser (choisir les 3 plus pertinentes selon le contexte) :**
> - "Pour quelle formation ou quel secteur souhaitez-vous créer ces personas ? (ex : BTS MCO, CAP Coiffure, Titre Pro Développeur Web, Bilan de compétences)"
> - "Quelle est la tranche d'âge principale visée ? (ex : 16-18 ans, 18-25 ans, 30+ en reconversion)"
> - "Y a-t-il un contexte particulier à prendre en compte ? (ex : public en reconversion, zone géographique spécifique, public en difficulté, alternance en entreprise)"

> **Règle d'or :** Si l'utilisateur ne répond qu'à une seule question, Manus génère quand même les personas en inférant les données manquantes à partir de la recherche externe et de sa connaissance du secteur.

---

### Étape 2 : Enrichissement par recherche externe

Utiliser l'outil `search` pour collecter des données quantitatives et qualitatives sur la cible. Croiser au minimum **3 sources** pour valider et enrichir les profils.

> **Exemples de requêtes de recherche :**
> - "statistiques apprentissage [secteur] France 2025 2026"
> - "profil apprentis [secteur] motivations difficultés"
> - "attentes génération Z formation professionnelle alternance"
> - "rapport au numérique jeunes 16-25 ans France"
> - "reconversion professionnelle [secteur] profil type 2025"
> - "taux de rupture contrat apprentissage [secteur]"

---

### Étape 3 : Génération de 3 à 5 personas distincts

Compiler toutes les informations pour rédiger **3 à 5 fiches personas** représentant la **diversité réelle** du public cible. Chaque persona doit être clairement différencié des autres sur au moins 3 dimensions (âge, motivation, rapport au numérique, parcours, freins, etc.).

**Règles de diversité obligatoires :**

| Dimension | Exemples de variation entre personas |
|---|---|
| Profil d'entrée | Sortant de 3ème / Titulaire d'un Bac / En reconversion |
| Motivation principale | Passion métier / Contrainte familiale / Projet entrepreneurial |
| Rapport au cadre | Autonome / Besoin de structure / En rupture scolaire |
| Rapport au numérique | Natif digital / Usage limité / Professionnel |
| Situation personnelle | Chez les parents / Logement autonome / Parent isolé |

Nommer chaque persona avec un prénom fictif et un surnom court qui résume son archétype (ex : **"Lucas, le Passionné"**, **"Amina, la Reconvertie"**, **"Dylan, le Décrocheur Motivé"**).

Produire les fiches dans un **fichier unique** nommé `personas_[nom_de_la_formation].md`, avec une **page de synthèse comparative** en tête de document.

---

### Étape 4 : Génération d'une image représentative pour chaque persona

Utiliser l'outil `generate` pour créer une image réaliste pour **chacun des personas**. Le prompt doit être basé sur les caractéristiques définies dans la fiche (âge, genre, secteur, environnement).

> **Exemple de prompt pour l'image :**
> "Photographie réaliste, portrait en buste d'une femme de 34 ans, en reconversion professionnelle, apprentie en BTS MCO. Elle est souriante, déterminée, habillée de façon professionnelle, dans un environnement de bureau moderne. Style photo professionnelle type LinkedIn."

---

### Étape 5 : Livraison et choix de l'utilisateur

Livrer à l'utilisateur :
1. Le fichier `personas_[nom_de_la_formation].md` contenant la page de synthèse et toutes les fiches détaillées.
2. Les images générées pour chaque persona.
3. Un message invitant l'utilisateur à **choisir le ou les personas** à retenir pour la suite de son projet.

---

## Page de Synthèse Comparative (obligatoire en tête de document)

Inclure impérativement ce tableau en première page du fichier de sortie, avant les fiches détaillées.

````markdown
# Synthèse des Personas : [Nom de la Formation]

> Ce document présente [N] personas représentatifs du public cible de la formation **[Nom de la formation]**. Ils ont été construits à partir des informations transmises et enrichis par une recherche externe sur le secteur. Choisissez le ou les personas les plus proches de votre réalité terrain pour affiner votre ingénierie pédagogique.

| # | Prénom & Archétype | Âge | Profil d'entrée | Motivation principale | Risque de rupture | Levier clé |
|---|---|---|---|---|---|---|
| 1 | [Prénom, "L'Archétype"] | [Âge] | [Profil] | [Motivation] | [Faible/Moyen/Élevé] | [Levier] |
| 2 | [Prénom, "L'Archétype"] | [Âge] | [Profil] | [Motivation] | [Faible/Moyen/Élevé] | [Levier] |
| 3 | [Prénom, "L'Archétype"] | [Âge] | [Profil] | [Motivation] | [Faible/Moyen/Élevé] | [Levier] |
| 4 | [Prénom, "L'Archétype"] | [Âge] | [Profil] | [Motivation] | [Faible/Moyen/Élevé] | [Levier] |
| 5 | [Prénom, "L'Archétype"] | [Âge] | [Profil] | [Motivation] | [Faible/Moyen/Élevé] | [Levier] |
````

---

## Template de Fiche Persona (Strict — à répéter pour chaque persona)

Utiliser impérativement la structure suivante pour chaque fiche dans le fichier de sortie.

````markdown
---

# Persona [N°] : [Prénom] — "[L'Archétype]"

**"[Insérer ici une citation fictive qui résume l'état d'esprit du persona en 1 phrase]"**

![Portrait de [Prénom]](image_persona_[N].png)

---

## 1. Identité et Démographie

*   **Prénom :** [Prénom fictif]
*   **Âge :** [Âge]
*   **Genre :** [Genre]
*   **Situation familiale :** [Ex: Vit chez ses parents, en couple avec enfant, logement autonome]
*   **Lieu de vie :** [Ex: Zone périurbaine, grande ville, zone rurale]
*   **Niveau d'études / Diplôme d'entrée :** [Ex: Bac Pro, sortie de 3ème, Licence non validée]
*   **Situation avant l'entrée en formation :** [Ex: Lycéen, demandeur d'emploi, salarié en reconversion]

## 2. Contexte Socio-Culturel et Comportemental

*   **Centres d'intérêt :** [Ex: Jeux vidéo, sport, musique, réseaux sociaux, cuisine]
*   **Habitudes médiatiques :** [Ex: TikTok, YouTube, Instagram, podcasts, presse spécialisée]
*   **Rapport à l'autorité et au cadre scolaire :** [Ex: En recherche d'autonomie, respectueux des règles, en rupture avec le système classique]
*   **Influences principales :** [Ex: Famille, amis, influenceurs, modèles professionnels]
*   **Valeurs clés :** [Ex: Authenticité, liberté, sécurité, reconnaissance sociale]

## 3. Rapport au Numérique

*   **Équipement :** [Ex: Smartphone récent, PC portable ancien, tablette, pas d'ordinateur personnel]
*   **Aisance avec les outils numériques :** [Ex: Très à l'aise avec les réseaux sociaux, difficultés avec les outils bureautiques (Word, Excel, Teams)]
*   **Plateformes de prédilection :** [Ex: Discord, Snapchat, Twitch, LinkedIn]
*   **Attentes vis-à-vis d'une plateforme de formation :** [Ex: Gamification, accès mobile-first, notifications instantanées, contenus courts]

## 4. Motivations et Objectifs Professionnels

*   **Pourquoi l'apprentissage ?** [Ex: Gagner de l'argent rapidement, apprendre un métier concret, fuir le système scolaire traditionnel, reconversion choisie]
*   **Objectifs à court terme :** [Ex: Obtenir son diplôme, décrocher son premier CDI, rembourser un crédit]
*   **Ambitions à long terme :** [Ex: Créer son entreprise, devenir manager, avoir un emploi stable et épanouissant]
*   **Ce qui le/la motive à se lever le matin :** [Ex: La passion pour le métier, l'ambiance avec les collègues, la perspective d'indépendance]

## 5. Freins, Peurs et Risques de Rupture

*   **Peurs principales :** [Ex: Peur de l'échec, de ne pas être à la hauteur en entreprise, de mal gérer son budget]
*   **Freins à l'apprentissage :** [Ex: Difficultés de concentration, lacunes théoriques, timidité, problèmes de transport]
*   **Signaux faibles de décrochage :** [Ex: Absentéisme croissant, conflits avec le maître d'apprentissage, isolement social]
*   **Ce qui pourrait le/la faire abandonner :** [Ex: Conflit en entreprise, sentiment d'isolement, difficultés financières, problème de santé]
*   **Niveau de risque de rupture :** [Faible / Moyen / Élevé] — *Justification courte*

## 6. Leviers d'Engagement et de Communication

*   **Ton de communication à privilégier :** [Ex: Direct et authentique, humoristique, encourageant et bienveillant, formel et structuré]
*   **Canaux de communication préférés :** [Ex: Notifications push sur mobile, messages courts sur WhatsApp/Discord, emails formels, entretiens en face-à-face]
*   **Types de contenus qui captent son attention :** [Ex: Vidéos courtes type "réel", tutoriels rapides, témoignages d'anciens apprentis, infographies, podcasts]
*   **Facteurs de motivation :** [Ex: Reconnaissance par les pairs et le formateur, récompenses (badges, points), progression visible, défis concrets, autonomie]
*   **Recommandations pédagogiques spécifiques :** [Ex: Privilégier les mises en situation pratiques, fractionner les apports théoriques, proposer un tutorat renforcé les 3 premiers mois]
````

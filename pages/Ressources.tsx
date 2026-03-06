import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, BookOpen, Briefcase, TrendingUp, Globe, GraduationCap, Heart, Lightbulb, DollarSign, Users, FileText, PlayCircle, ChevronRight, Clock, Tag, Star, Filter, Building, Award, Compass, Zap, Shield, BarChart2, Coffee, Target } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Resource {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  type: 'article' | 'guide' | 'fiche' | 'module' | 'checklist' | 'outil';
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  description: string;
  content: string;
  tags: string[];
  isFeatured?: boolean;
}

// ─── DONNÉES RESSOURCES ────────────────────────────────────────────────────────
const RESOURCES: Resource[] = [
  // ── CRÉATION D'ENTREPRISE ──────────────────────────────────────────────────
  {
    id: 'crea-1',
    title: 'Les 10 étapes pour créer son entreprise en France',
    category: 'Création d\'entreprise',
    subcategory: 'Démarches',
    type: 'guide',
    duration: '15 min',
    level: 'Débutant',
    description: 'Un guide complet et structuré pour comprendre toutes les étapes de la création d\'entreprise, de l\'idée à l\'immatriculation.',
    isFeatured: true,
    tags: ['création', 'entreprise', 'démarches', 'SIREN'],
    content: `## Les 10 étapes pour créer son entreprise en France

### Étape 1 — Valider votre idée et votre marché
Avant tout, il est essentiel de vérifier que votre idée répond à un besoin réel. Réalisez une étude de marché : identifiez vos clients potentiels, analysez la concurrence et évaluez la taille du marché. Un questionnaire auprès de 30 à 50 personnes de votre cible suffit souvent pour valider ou invalider une hypothèse.

### Étape 2 — Choisir votre statut juridique
Le choix du statut conditionne votre fiscalité, votre protection sociale et votre responsabilité. Les principales formes sont la micro-entreprise (idéale pour démarrer seul avec peu de charges), l'EURL (entrepreneur individuel avec responsabilité limitée), la SARL (pour s'associer à 2 à 100 personnes) et la SAS/SASU (très flexible, idéale pour lever des fonds).

### Étape 3 — Rédiger votre business plan
Le business plan est votre feuille de route. Il comprend une présentation du projet, une analyse de marché, une stratégie commerciale, un plan de financement et des prévisions financières sur 3 ans. C'est aussi l'outil indispensable pour convaincre les banques et les investisseurs.

### Étape 4 — Trouver votre financement
Plusieurs options s'offrent à vous : l'apport personnel, le prêt bancaire, les aides publiques (ACRE, ARCE pour les demandeurs d'emploi), le crowdfunding, les business angels ou les prêts d'honneur via les réseaux d'accompagnement.

### Étape 5 — Choisir votre nom commercial et votre domaine
Vérifiez la disponibilité de votre nom auprès de l'INPI (Institut National de la Propriété Industrielle). Déposez votre marque si nécessaire. Réservez votre nom de domaine internet dès que possible.

### Étape 6 — Rédiger les statuts
Pour les sociétés (SARL, SAS, etc.), la rédaction des statuts est obligatoire. Ce document fondateur définit les règles de fonctionnement de votre entreprise. Faites-vous accompagner par un avocat ou un expert-comptable pour éviter les erreurs.

### Étape 7 — Déposer le capital social
Pour les sociétés, vous devez déposer le capital social sur un compte bancaire bloqué. Un certificat de dépôt vous sera remis, nécessaire pour l'immatriculation.

### Étape 8 — Publier une annonce légale
La publication d'un avis de constitution dans un journal d'annonces légales (JAL) est obligatoire pour les sociétés. Cette formalité coûte entre 150 et 300 €.

### Étape 9 — S'immatriculer au Registre du Commerce
Depuis 2023, toutes les démarches se font sur le guichet unique des formalités des entreprises (formalites.entreprises.gouv.fr). Vous obtiendrez votre numéro SIREN, SIRET et votre code APE.

### Étape 10 — Ouvrir un compte bancaire professionnel et démarrer
Une fois immatriculé(e), ouvrez un compte bancaire professionnel, souscrivez les assurances nécessaires (RC Pro, multirisque professionnelle) et commencez à prospecter vos premiers clients.

**Ressources complémentaires :** Bpifrance Création, CCI de votre région, réseau Initiative France, ADIE pour les micro-entrepreneurs.`
  },
  {
    id: 'crea-2',
    title: 'Micro-entreprise vs SASU : quel statut choisir ?',
    category: 'Création d\'entreprise',
    subcategory: 'Statuts juridiques',
    type: 'fiche',
    duration: '10 min',
    level: 'Débutant',
    description: 'Comparatif détaillé des deux statuts les plus populaires pour les créateurs solo, avec leurs avantages et inconvénients.',
    tags: ['micro-entreprise', 'SASU', 'statut', 'fiscalité'],
    content: `## Micro-entreprise vs SASU : quel statut choisir ?

### La micro-entreprise (anciennement auto-entrepreneur)

La micro-entreprise est le statut le plus simple pour démarrer une activité. Elle s'adresse aux personnes souhaitant tester une activité avec un minimum de contraintes administratives.

**Avantages :** Création en ligne en 24h, pas de comptabilité complexe, charges sociales calculées sur le chiffre d'affaires réel (pas de CA = pas de charges), régime fiscal simplifié avec versement libératoire possible.

**Inconvénients :** Plafonds de chiffre d'affaires (77 700 € pour les services, 188 700 € pour le commerce), pas de déduction des charges réelles, image parfois moins professionnelle, protection sociale moins favorable.

**Idéal pour :** Tester une activité, activité complémentaire, professions libérales débutantes, artisans et commerçants avec faibles charges.

### La SASU (Société par Actions Simplifiée Unipersonnelle)

La SASU est une société à associé unique, très flexible et adaptée aux projets ambitieux.

**Avantages :** Responsabilité limitée au capital, statut de président assimilé salarié (protection sociale complète), pas de plafond de CA, déduction des charges réelles, image professionnelle forte, facilité pour accueillir des associés ou lever des fonds.

**Inconvénients :** Création plus complexe (statuts, capital minimum conseillé de 1 000 €), comptabilité obligatoire, charges sociales élevées même sans rémunération, coûts de gestion plus importants.

**Idéal pour :** Projets ambitieux, activités nécessitant une forte crédibilité, personnes souhaitant se verser un salaire et bénéficier d'une protection sociale complète.

### Comment choisir ?

Choisissez la micro-entreprise si vous démarrez, avez peu de charges et souhaitez tester votre activité. Optez pour la SASU si votre activité génère des charges importantes, si vous souhaitez vous verser un salaire conséquent ou si vous envisagez une croissance rapide.`
  },
  {
    id: 'crea-3',
    title: 'Financer sa création d\'entreprise : toutes les aides disponibles',
    category: 'Création d\'entreprise',
    subcategory: 'Financement',
    type: 'guide',
    duration: '12 min',
    level: 'Débutant',
    description: 'Tour d\'horizon complet des aides financières accessibles aux créateurs d\'entreprise en France : ACRE, ARCE, prêts d\'honneur, etc.',
    tags: ['financement', 'ACRE', 'ARCE', 'aides', 'subventions'],
    content: `## Financer sa création d'entreprise : toutes les aides disponibles

### L'ACRE (Aide à la Création ou à la Reprise d'une Entreprise)
L'ACRE est une exonération partielle de charges sociales pendant la première année d'activité. Elle s'adresse aux demandeurs d'emploi, aux bénéficiaires du RSA, aux jeunes de moins de 26 ans et à d'autres publics spécifiques. Elle permet de réduire significativement les charges sociales lors du démarrage.

### L'ARCE (Aide à la Reprise ou à la Création d'Entreprise)
Si vous êtes demandeur d'emploi et bénéficiez de l'ARE (allocation chômage), vous pouvez opter pour l'ARCE : recevoir 60% de vos droits restants en deux versements (au démarrage et 6 mois après). C'est une alternative au maintien de l'ARE pendant la création.

### Le maintien de l'ARE
Autre option pour les demandeurs d'emploi : conserver vos allocations chômage tout en créant votre entreprise. Vous percevez une partie de l'ARE selon vos revenus d'activité. Cette option est souvent préférable à l'ARCE si votre activité démarre lentement.

### Les prêts d'honneur
Des réseaux comme Initiative France, Réseau Entreprendre ou France Active proposent des prêts à taux zéro (entre 5 000 et 50 000 €) sans garantie personnelle. Ils permettent d'obtenir plus facilement un crédit bancaire en parallèle.

### Le prêt Bpifrance
Bpifrance propose plusieurs dispositifs : le prêt création (jusqu'à 45 000 €), le prêt d'amorçage (pour les startups innovantes) et des garanties bancaires pour faciliter l'accès au crédit.

### Les aides régionales et locales
Chaque région dispose de ses propres dispositifs d'aide à la création. Renseignez-vous auprès de votre CCI (Chambre de Commerce et d'Industrie) ou de votre Conseil Régional.

### Le crowdfunding
Les plateformes de financement participatif permettent de lever des fonds auprès du grand public. Il existe trois formes : le don (Ulule, KissKissBankBank), le prêt (October, Lendopolis) et l'investissement en capital (Wiseed, Anaxago).

### Les business angels et le capital-risque
Pour les projets innovants à fort potentiel, les business angels (investisseurs individuels) et les fonds de capital-risque peuvent investir en échange d'une participation au capital.`
  },
  {
    id: 'crea-4',
    title: 'Business plan : le guide pas à pas',
    category: 'Création d\'entreprise',
    subcategory: 'Business plan',
    type: 'module',
    duration: '20 min',
    level: 'Intermédiaire',
    description: 'Apprenez à rédiger un business plan convaincant, section par section, avec des exemples concrets et des conseils d\'experts.',
    tags: ['business plan', 'prévisionnel', 'stratégie', 'financement'],
    content: `## Business plan : le guide pas à pas

### Pourquoi un business plan ?
Le business plan est bien plus qu'un document pour les banques. C'est votre outil de réflexion stratégique, votre feuille de route et votre argument de vente auprès de tous vos partenaires. Un bon business plan vous force à structurer votre pensée et à anticiper les obstacles.

### Structure d'un business plan efficace

**1. Le résumé exécutif (Executive Summary)**
C'est la partie la plus lue. En 1 à 2 pages, présentez votre projet, votre équipe, votre marché, votre modèle économique et vos besoins financiers. Rédigez-le en dernier, une fois le reste du document finalisé.

**2. La présentation du porteur de projet**
Votre parcours, vos compétences, vos motivations. Montrez pourquoi vous êtes la bonne personne pour mener ce projet.

**3. La description du projet**
Quelle est votre offre ? Quel problème résolvez-vous ? Quelle est votre proposition de valeur unique ? Décrivez votre produit ou service de manière claire et convaincante.

**4. L'analyse de marché**
Taille du marché, tendances, segmentation client, analyse de la concurrence (forces, faiblesses, positionnement). Utilisez la méthode SWOT pour synthétiser votre analyse.

**5. La stratégie commerciale**
Comment allez-vous acquérir vos clients ? Quel est votre plan marketing (canaux, messages, budget) ? Quelle est votre politique de prix ? Comment allez-vous fidéliser vos clients ?

**6. L'organisation et les ressources humaines**
Structure de l'entreprise, organigramme, profils des associés, plan de recrutement si nécessaire.

**7. Le plan financier**
C'est le cœur du business plan pour les banquiers. Il comprend le compte de résultat prévisionnel (3 ans), le plan de financement, le plan de trésorerie (12 mois) et le calcul du seuil de rentabilité (point mort).

### Les erreurs à éviter
Ne surestimez pas vos revenus. Soyez réaliste et présentez plusieurs scénarios (optimiste, réaliste, pessimiste). Ne sous-estimez pas vos charges. Montrez que vous connaissez votre marché et votre concurrence.`
  },

  // ── RECONVERSION PROFESSIONNELLE ──────────────────────────────────────────
  {
    id: 'reconv-1',
    title: 'Réussir sa reconversion professionnelle : le guide complet',
    category: 'Reconversion professionnelle',
    subcategory: 'Stratégie',
    type: 'guide',
    duration: '18 min',
    level: 'Débutant',
    description: 'Tout ce qu\'il faut savoir pour préparer, planifier et réussir une reconversion professionnelle en minimisant les risques.',
    isFeatured: true,
    tags: ['reconversion', 'changement de carrière', 'projet professionnel'],
    content: `## Réussir sa reconversion professionnelle : le guide complet

### Pourquoi se reconvertir ?
La reconversion professionnelle est devenue un phénomène majeur. Selon les études récentes, plus d'un actif sur deux envisage de changer de métier au cours de sa carrière. Les motivations sont variées : quête de sens, épuisement professionnel, évolution du marché du travail, désir d'entrepreneuriat ou simplement l'envie de s'épanouir davantage.

### Les 6 étapes d'une reconversion réussie

**Étape 1 — Faire le point sur soi**
Avant de regarder vers l'extérieur, regardez vers l'intérieur. Identifiez vos valeurs, vos motivations profondes, vos compétences transférables et vos contraintes (familiales, financières, géographiques). Le bilan de compétences est l'outil idéal pour cette phase.

**Étape 2 — Explorer les pistes**
Brainstormez sans vous censurer. Listez tous les métiers qui vous attirent, même ceux qui semblent improbables. Utilisez des outils comme l'ONISEP, le ROME (Répertoire Opérationnel des Métiers et des Emplois) ou des plateformes comme Orientation pour Adultes.

**Étape 3 — Enquêter sur le terrain**
Rien ne remplace les enquêtes métiers. Contactez des professionnels exerçant les métiers qui vous intéressent. LinkedIn est un outil précieux pour cela. Demandez des entretiens informatifs de 30 minutes. Vous obtiendrez des informations précieuses sur le quotidien du métier, les formations nécessaires et les débouchés réels.

**Étape 4 — Valider votre projet**
Avant de vous lancer, testez votre projet. Réalisez des stages, des missions en freelance ou du bénévolat dans votre domaine cible. Cette phase de validation est cruciale pour confirmer votre choix et éviter les mauvaises surprises.

**Étape 5 — Planifier votre transition**
Définissez un rétroplanning réaliste. Identifiez les formations nécessaires, les certifications à obtenir, les financements disponibles (CPF, plan de développement des compétences, France Travail). Construisez un plan d'action avec des jalons clairs.

**Étape 6 — Communiquer et networker**
Parlez de votre projet autour de vous. Rejoignez des communautés professionnelles dans votre domaine cible. Construisez votre nouveau réseau avant même d'avoir terminé votre formation. LinkedIn est votre meilleur allié.

### Les pièges à éviter
Ne partez pas sans filet. Constituez une épargne de sécurité (6 à 12 mois de charges). Ne vous isolez pas dans votre réflexion. Faites-vous accompagner. Ne sous-estimez pas le temps nécessaire : une reconversion prend en moyenne 18 à 24 mois.`
  },
  {
    id: 'reconv-2',
    title: 'Identifier ses compétences transférables',
    category: 'Reconversion professionnelle',
    subcategory: 'Compétences',
    type: 'outil',
    duration: '12 min',
    level: 'Débutant',
    description: 'Méthode pratique pour identifier et valoriser vos compétences transférables d\'un secteur à l\'autre.',
    tags: ['compétences transférables', 'soft skills', 'valorisation'],
    content: `## Identifier ses compétences transférables

### Qu'est-ce qu'une compétence transférable ?
Une compétence transférable est une aptitude ou un savoir-faire acquis dans un contexte donné qui peut être appliqué dans un autre domaine. Par opposition aux compétences techniques spécifiques (hard skills), les compétences transférables sont des ressources précieuses lors d'une reconversion.

### Les 3 catégories de compétences transférables

**Les compétences relationnelles**
Communication orale et écrite, écoute active, négociation, gestion de conflits, travail en équipe, management, service client. Ces compétences sont universelles et valorisées dans tous les secteurs.

**Les compétences organisationnelles**
Gestion de projet, planification, priorisation, gestion du temps, rigueur, sens du détail, capacité à travailler sous pression. Ces compétences sont particulièrement recherchées dans les environnements complexes.

**Les compétences analytiques et décisionnelles**
Analyse de données, résolution de problèmes, prise de décision, pensée critique, capacité de synthèse, créativité. Ces compétences sont de plus en plus valorisées à l'ère du numérique.

### Méthode pour identifier vos compétences transférables

**Exercice 1 — La méthode STAR**
Pour chaque expérience professionnelle significative, décrivez une Situation, la Tâche que vous aviez à accomplir, les Actions que vous avez menées et les Résultats obtenus. Cette méthode révèle vos compétences en action.

**Exercice 2 — Le bilan de vos réussites**
Listez vos 10 plus grandes réussites professionnelles et personnelles. Pour chacune, identifiez les compétences mobilisées. Vous verrez apparaître des récurrences qui révèlent vos forces naturelles.

**Exercice 3 — Le regard des autres**
Demandez à 5 personnes qui vous connaissent bien (collègues, amis, famille) de vous décrire en 5 adjectifs ou compétences. La convergence de leurs réponses révèle vos compétences les plus visibles.

### Comment valoriser vos compétences transférables
Dans votre CV et vos lettres de motivation, traduisez vos expériences passées en termes de compétences universelles. Utilisez des chiffres et des résultats concrets pour illustrer vos compétences. Lors des entretiens, préparez des exemples précis pour chaque compétence clé.`
  },

  // ── FINANCEMENT ET CPF ─────────────────────────────────────────────────────
  {
    id: 'fin-1',
    title: 'Le CPF (Compte Personnel de Formation) : tout comprendre',
    category: 'Financement de la formation',
    subcategory: 'CPF',
    type: 'guide',
    duration: '12 min',
    level: 'Débutant',
    description: 'Guide complet sur le Compte Personnel de Formation : fonctionnement, droits, utilisation et formations éligibles.',
    isFeatured: true,
    tags: ['CPF', 'formation', 'financement', 'droits'],
    content: `## Le CPF (Compte Personnel de Formation) : tout comprendre

### Qu'est-ce que le CPF ?
Le Compte Personnel de Formation (CPF) est un dispositif qui permet à toute personne active (salarié, demandeur d'emploi, travailleur indépendant) d'acquérir des droits à la formation tout au long de sa vie professionnelle. Ces droits sont exprimés en euros depuis 2019.

### Comment s'alimentent vos droits ?
Pour un salarié à temps plein, le CPF est alimenté de 500 € par an, dans la limite de 5 000 € (plafond). Pour les salariés peu qualifiés (sans qualification de niveau CAP/BEP), l'alimentation est de 800 € par an, dans la limite de 8 000 €. Les droits sont visibles sur le site Mon Compte Formation.

### Comment utiliser votre CPF ?
Vous pouvez utiliser votre CPF pour financer des formations certifiantes, des bilans de compétences, des VAE (Validation des Acquis de l'Expérience) ou des permis de conduire professionnels. La démarche se fait entièrement en ligne sur Mon Compte Formation.

### Le CPF pour le bilan de compétences
Le bilan de compétences est éligible au CPF. Son coût moyen est de 1 500 à 3 000 €. Si vos droits CPF ne couvrent pas la totalité du coût, vous pouvez compléter avec un abondement de votre employeur, une aide de France Travail ou un financement personnel.

### Le CPF de transition professionnelle (ex-CIF)
Pour une reconversion nécessitant une formation longue, le CPF de transition professionnelle (anciennement CIF) permet de financer une formation certifiante tout en maintenant votre rémunération. La demande se fait auprès de votre Commission Paritaire Interprofessionnelle Régionale (CPIR/Transitions Pro).

### Attention aux arnaques
Depuis 2021, les démarchages abusifs liés au CPF se sont multipliés. Ne communiquez jamais vos identifiants CPF à un tiers. Toute utilisation de votre CPF doit être initiée par vous-même sur Mon Compte Formation.`
  },
  {
    id: 'fin-2',
    title: 'Les OPCO : financement de la formation en entreprise',
    category: 'Financement de la formation',
    subcategory: 'OPCO',
    type: 'fiche',
    duration: '8 min',
    level: 'Intermédiaire',
    description: 'Comprendre le rôle des Opérateurs de Compétences (OPCO) et comment en bénéficier pour financer vos formations.',
    tags: ['OPCO', 'formation professionnelle', 'entreprise', 'financement'],
    content: `## Les OPCO : financement de la formation en entreprise

### Qu'est-ce qu'un OPCO ?
Les Opérateurs de Compétences (OPCO) sont des organismes agréés par l'État chargés de collecter et de gérer les contributions des entreprises à la formation professionnelle. Ils ont remplacé les OPCA en 2019 suite à la loi Avenir Professionnel.

### Les 11 OPCO en France
Chaque OPCO couvre un ou plusieurs secteurs d'activité. Parmi les principaux : OPCO 2i (industrie), OPCO EP (éducation et formation), AFDAS (culture, communication, sport), ATLAS (services financiers), CONSTRUCTYS (construction), AKTO (services à forte intensité de main-d'œuvre), OCAPIAT (agriculture), OPCO Santé, UNIFORMATION (économie sociale), OPCO Mobilités, OPCOMMERCE.

### Ce que finance un OPCO
Les OPCO financent les formations dans le cadre du plan de développement des compétences (pour les salariés), l'alternance (contrats d'apprentissage et de professionnalisation), les formations des demandeurs d'emploi et les bilans de compétences.

### Comment en bénéficier ?
Pour les salariés, c'est l'employeur qui fait la demande de prise en charge auprès de l'OPCO de son secteur. Pour les indépendants et TNS (Travailleurs Non Salariés), certains OPCO proposent des financements spécifiques. Pour les demandeurs d'emploi, France Travail peut orienter vers les OPCO.

### Les plafonds de financement
Les montants pris en charge varient selon l'OPCO, la taille de l'entreprise et le type de formation. Les TPE/PME bénéficient généralement de conditions plus favorables. Renseignez-vous directement auprès de l'OPCO de votre secteur pour connaître les plafonds applicables.`
  },

  // ── MARCHÉ DU TRAVAIL ──────────────────────────────────────────────────────
  {
    id: 'marche-1',
    title: 'Les métiers d\'avenir : secteurs porteurs 2025-2030',
    category: 'Marché du travail',
    subcategory: 'Tendances',
    type: 'article',
    duration: '15 min',
    level: 'Débutant',
    description: 'Analyse des secteurs et métiers en forte croissance pour les 5 prochaines années, basée sur les études prospectives.',
    isFeatured: true,
    tags: ['métiers d\'avenir', 'tendances', 'emploi', 'numérique', 'transition écologique'],
    content: `## Les métiers d'avenir : secteurs porteurs 2025-2030

### La transition numérique : un moteur d'emploi massif
Le secteur du numérique continue de créer des emplois à un rythme soutenu. Les métiers les plus recherchés sont les développeurs (web, mobile, IA), les data scientists et analystes de données, les experts en cybersécurité, les chefs de projet digital et les UX/UI designers. Ces métiers offrent des salaires attractifs et une forte mobilité internationale.

### La transition écologique : des milliers de métiers à créer
La transition énergétique et écologique génère des besoins considérables en compétences. Les métiers verts en forte croissance incluent les techniciens en énergies renouvelables (solaire, éolien), les experts en rénovation énergétique des bâtiments, les ingénieurs en économie circulaire, les consultants en RSE (Responsabilité Sociétale des Entreprises) et les spécialistes de la mobilité durable.

### La santé et le médico-social : une demande structurelle
Le vieillissement de la population et les nouvelles attentes en matière de santé créent une demande durable. Les métiers en tension incluent les aides-soignants, les infirmiers, les kinésithérapeutes, les orthophonistes, les psychologues et les coordinateurs de parcours de soins.

### L'intelligence artificielle : un secteur en explosion
L'IA crée de nouveaux métiers tout en transformant les existants. Les profils recherchés sont les ingénieurs en machine learning, les prompt engineers, les éthiciens de l'IA, les formateurs à l'IA et les intégrateurs de solutions IA pour les entreprises.

### Les services à la personne : une croissance continue
L'aide à domicile, la garde d'enfants, le soutien scolaire et les services de conciergerie sont en forte croissance. Ces métiers offrent des opportunités d'entrepreneuriat accessibles.

### Les compétences transversales les plus recherchées
Quelle que soit le secteur, certaines compétences sont universellement valorisées : la capacité d'adaptation, la maîtrise des outils numériques, la pensée critique, la créativité, la communication interculturelle et la gestion de projet.`
  },
  {
    id: 'marche-2',
    title: 'Réussir son entretien d\'embauche : méthodes et techniques',
    category: 'Marché du travail',
    subcategory: 'Recherche d\'emploi',
    type: 'guide',
    duration: '20 min',
    level: 'Débutant',
    description: 'Toutes les techniques pour préparer et réussir ses entretiens d\'embauche, de la préparation à la négociation salariale.',
    tags: ['entretien', 'embauche', 'recrutement', 'négociation'],
    content: `## Réussir son entretien d'embauche : méthodes et techniques

### La préparation : la clé du succès
Un entretien réussi se prépare en amont. Renseignez-vous sur l'entreprise (histoire, valeurs, actualités, concurrents), le poste (missions, compétences requises, enjeux) et votre interlocuteur (LinkedIn). Préparez des réponses aux questions classiques et des exemples concrets illustrant vos compétences.

### Les questions incontournables et comment y répondre

**"Parlez-moi de vous"**
Préparez un pitch de 2 minutes structuré : parcours, compétences clés, motivations pour ce poste. Soyez concis et percutant. Évitez de réciter votre CV.

**"Quelles sont vos forces et faiblesses ?"**
Pour les forces, citez 3 compétences directement liées au poste avec des exemples. Pour les faiblesses, choisissez une vraie faiblesse que vous travaillez activement à améliorer. Montrez votre capacité d'auto-évaluation.

**"Où vous voyez-vous dans 5 ans ?"**
Montrez de l'ambition tout en restant cohérent avec le poste proposé. Parlez d'évolution au sein de l'entreprise plutôt que d'un départ.

**"Pourquoi voulez-vous ce poste ?"**
Montrez que vous avez fait des recherches. Reliez vos motivations aux valeurs et aux enjeux de l'entreprise. Soyez authentique.

### La méthode STAR pour les questions comportementales
Pour les questions du type "Racontez-moi une situation où...", utilisez la méthode STAR : Situation (contexte), Tâche (votre rôle), Action (ce que vous avez fait), Résultat (l'impact de vos actions). Cette méthode rend vos réponses concrètes et mémorables.

### La négociation salariale
Ne parlez pas de salaire en premier. Attendez que le recruteur aborde le sujet. Renseignez-vous sur les salaires du marché (Glassdoor, LinkedIn Salary, APEC). Donnez une fourchette plutôt qu'un chiffre précis. N'oubliez pas de négocier les avantages en nature (télétravail, formation, mutuelle).

### Les questions à poser au recruteur
Préparez 3 à 5 questions pertinentes : les enjeux du poste, l'équipe, la culture d'entreprise, les perspectives d'évolution, les prochaines étapes du processus. Évitez les questions sur le salaire et les congés lors du premier entretien.`
  },

  // ── VAE ───────────────────────────────────────────────────────────────────
  {
    id: 'vae-1',
    title: 'La VAE (Validation des Acquis de l\'Expérience) : mode d\'emploi',
    category: 'VAE',
    subcategory: 'Démarches',
    type: 'guide',
    duration: '15 min',
    level: 'Débutant',
    description: 'Comprendre et réussir sa VAE : conditions, démarches, financement et conseils pour valoriser son expérience en diplôme.',
    tags: ['VAE', 'diplôme', 'expérience', 'certification'],
    content: `## La VAE (Validation des Acquis de l'Expérience) : mode d'emploi

### Qu'est-ce que la VAE ?
La Validation des Acquis de l'Expérience (VAE) est un droit permettant à toute personne d'obtenir tout ou partie d'une certification (diplôme, titre professionnel, certificat de qualification) en faisant reconnaître son expérience professionnelle ou bénévole. C'est un dispositif puissant pour valoriser des années d'expérience sans repasser par la case formation.

### Qui peut bénéficier de la VAE ?
Toute personne justifiant d'au moins 1 an d'expérience (salariée, non salariée, bénévole, volontaire) en rapport avec la certification visée peut déposer une demande de VAE. Il n'y a pas de condition d'âge, de diplôme ou de statut.

### Les étapes de la VAE

**Étape 1 — Choisir sa certification**
Identifiez la certification la plus adaptée à votre expérience et à votre projet professionnel. Consultez le Répertoire National des Certifications Professionnelles (RNCP) pour trouver les certifications reconnues.

**Étape 2 — Vérifier la recevabilité (livret 1)**
Déposez un dossier de recevabilité (livret 1) auprès de l'organisme certificateur. Ce dossier présente votre expérience en lien avec la certification visée. La réponse est donnée dans un délai de 2 mois.

**Étape 3 — Constituer le dossier de preuves (livret 2)**
C'est l'étape la plus importante et la plus chronophage. Le livret 2 est un dossier détaillé décrivant vos activités, vos responsabilités et vos compétences en lien avec le référentiel de la certification. Faites-vous accompagner par un conseiller VAE.

**Étape 4 — Passer devant le jury**
Le jury évalue votre dossier et vous reçoit en entretien. Il peut valider tout ou partie de la certification. En cas de validation partielle, des compléments de formation sont proposés.

### Financement de la VAE
La VAE peut être financée par le CPF, le plan de développement des compétences de votre employeur, France Travail (si vous êtes demandeur d'emploi) ou les OPCO.

### Conseils pour réussir sa VAE
Faites-vous accompagner dès le début. Soyez précis et concret dans votre dossier. Utilisez le vocabulaire du référentiel de compétences. Préparez soigneusement votre entretien avec le jury.`
  },

  // ── DÉVELOPPEMENT PERSONNEL ────────────────────────────────────────────────
  {
    id: 'dev-1',
    title: 'Gérer le stress et l\'anxiété professionnelle',
    category: 'Développement personnel',
    subcategory: 'Bien-être au travail',
    type: 'guide',
    duration: '12 min',
    level: 'Débutant',
    description: 'Techniques pratiques et scientifiquement validées pour gérer le stress professionnel et préserver son équilibre.',
    tags: ['stress', 'bien-être', 'mindfulness', 'burn-out'],
    content: `## Gérer le stress et l'anxiété professionnelle

### Comprendre le stress professionnel
Le stress est une réponse naturelle de l'organisme face à une situation perçue comme menaçante ou dépassant nos ressources. En faible quantité, il est stimulant (eustress). Chronique, il devient délétère et peut conduire au burn-out. Identifier ses sources de stress est la première étape pour les gérer.

### Les techniques de gestion du stress validées scientifiquement

**La cohérence cardiaque**
Cette technique de respiration (5 secondes d'inspiration, 5 secondes d'expiration, pendant 5 minutes, 3 fois par jour) régule le système nerveux autonome et réduit significativement le cortisol (hormone du stress). Des applications comme Respirelax ou Cohérence Cardiaque 365 vous guident.

**La pleine conscience (Mindfulness)**
La méditation de pleine conscience, même pratiquée 10 minutes par jour, réduit l'anxiété et améliore la concentration. Des programmes comme MBSR (Mindfulness-Based Stress Reduction) ont démontré leur efficacité dans de nombreuses études cliniques.

**La technique STOP**
Quand vous sentez le stress monter : Stop (arrêtez ce que vous faites), Take a breath (respirez profondément), Observe (observez vos pensées et sensations sans jugement), Proceed (reprenez avec plus de recul).

### Prévenir le burn-out
Le burn-out est un épuisement professionnel qui se développe progressivement. Les signaux d'alarme sont : fatigue chronique, cynisme croissant, sentiment d'inefficacité, isolement. Si vous vous reconnaissez dans ces symptômes, consultez un médecin et parlez-en à votre consultant en bilan de compétences.

### L'hygiène de vie comme bouclier anti-stress
Le sommeil (7-9h par nuit), l'activité physique régulière (30 minutes par jour), une alimentation équilibrée et des relations sociales de qualité sont les piliers d'une bonne résistance au stress. Ces habitudes ne sont pas des luxes mais des investissements dans votre performance et votre santé.

### Quand consulter un professionnel ?
Si le stress affecte significativement votre qualité de vie, votre sommeil ou vos relations, n'hésitez pas à consulter un psychologue ou un médecin. La thérapie cognitive et comportementale (TCC) est particulièrement efficace pour les troubles anxieux liés au travail.`
  },
  {
    id: 'dev-2',
    title: 'Construire et développer son réseau professionnel',
    category: 'Développement personnel',
    subcategory: 'Networking',
    type: 'guide',
    duration: '15 min',
    level: 'Intermédiaire',
    description: 'Stratégies concrètes pour construire un réseau professionnel solide et l\'utiliser efficacement dans sa carrière.',
    tags: ['réseau', 'networking', 'LinkedIn', 'carrière'],
    content: `## Construire et développer son réseau professionnel

### Pourquoi le réseau est-il essentiel ?
Selon les études, 70 à 80% des offres d'emploi ne sont jamais publiées. Elles se pourvoyent par le réseau, les recommandations et la cooptation. Un réseau professionnel solide est donc un avantage compétitif majeur dans votre carrière.

### Les principes du networking efficace

**Donnez avant de recevoir**
Le networking efficace repose sur la réciprocité. Commencez par apporter de la valeur à votre réseau : partagez des informations utiles, mettez des personnes en relation, recommandez des contacts. Les personnes qui donnent sans attendre de retour immédiat construisent les réseaux les plus solides.

**Qualité plutôt que quantité**
Mieux vaut 50 contacts avec qui vous avez une relation authentique que 500 contacts que vous ne connaissez pas. Concentrez-vous sur des relations profondes et mutuellement bénéfiques.

**La diversité de votre réseau**
Un réseau efficace comprend des personnes de secteurs variés, de niveaux hiérarchiques différents et de profils complémentaires. Les "ponts" entre différents réseaux sont souvent les plus précieux.

### Stratégie LinkedIn : les fondamentaux

Optimisez votre profil (photo professionnelle, titre accrocheur, résumé percutant, expériences détaillées). Publiez régulièrement du contenu à valeur ajoutée dans votre domaine. Commentez et partagez les publications de votre réseau. Envoyez des demandes de connexion personnalisées. Rejoignez des groupes actifs dans votre secteur.

### Les événements de networking
Participez à des conférences, salons professionnels, meetups et événements sectoriels. Préparez votre pitch (30 secondes pour vous présenter). Collectez des cartes de visite et faites un suivi dans les 48h par email ou LinkedIn.

### Entretenir son réseau
Le networking n'est pas une activité ponctuelle mais un investissement continu. Prenez des nouvelles de vos contacts régulièrement. Félicitez-les pour leurs succès. Proposez votre aide spontanément. Un réseau s'entretient comme une plante : avec régularité et attention.`
  },

  // ── NUMÉRIQUE ET DIGITAL ───────────────────────────────────────────────────
  {
    id: 'num-1',
    title: 'Se former au numérique : les ressources gratuites incontournables',
    category: 'Formation numérique',
    subcategory: 'Autoformation',
    type: 'fiche',
    duration: '8 min',
    level: 'Débutant',
    description: 'Sélection des meilleures plateformes et ressources gratuites pour se former aux compétences numériques essentielles.',
    tags: ['numérique', 'formation gratuite', 'digital', 'compétences'],
    content: `## Se former au numérique : les ressources gratuites incontournables

### Pourquoi les compétences numériques sont-elles indispensables ?
Quelle que soit votre profession, les compétences numériques sont devenues incontournables. Maîtriser les outils bureautiques, comprendre les bases du marketing digital, savoir utiliser les réseaux sociaux professionnellement ou appréhender l'intelligence artificielle sont des atouts différenciants sur le marché du travail.

### Les plateformes de formation gratuites

**PIX**
PIX est la plateforme nationale de certification des compétences numériques. Elle évalue et développe vos compétences dans 5 domaines : information et données, communication et collaboration, création de contenu, protection et sécurité, environnement numérique. La certification PIX est reconnue par les employeurs.

**France Compétences Numérique**
Plateforme gouvernementale proposant des parcours de formation aux compétences numériques de base, accessibles à tous les niveaux.

**OpenClassrooms (cours gratuits)**
OpenClassrooms propose de nombreux cours gratuits en développement web, data science, marketing digital, gestion de projet et design UX/UI. Les parcours payants sont éligibles au CPF.

**Coursera et edX (audit gratuit)**
Ces plateformes mondiales proposent des cours de grandes universités (MIT, Stanford, HEC) en audit gratuit. Vous accédez aux vidéos et aux exercices sans certification.

**Google Digital Garage**
Google propose des formations gratuites et certifiantes en marketing digital, analyse de données et intelligence artificielle. Les certifications Google sont reconnues par les employeurs.

**Microsoft Learn**
Formation gratuite aux outils Microsoft (Office 365, Azure, Power BI) avec des certifications reconnues.

### Les compétences numériques prioritaires à développer
Maîtrise des outils bureautiques (Excel, Word, PowerPoint), utilisation des outils collaboratifs (Teams, Slack, Notion), bases du marketing digital (réseaux sociaux, SEO, email marketing), initiation à l'intelligence artificielle et aux outils IA, cybersécurité de base.`
  },

  // ── LEADERSHIP ET MANAGEMENT ───────────────────────────────────────────────
  {
    id: 'lead-1',
    title: 'Les fondamentaux du leadership moderne',
    category: 'Leadership et management',
    subcategory: 'Leadership',
    type: 'module',
    duration: '20 min',
    level: 'Intermédiaire',
    description: 'Comprendre les styles de leadership, développer son intelligence émotionnelle et inspirer son équipe dans un contexte en mutation.',
    tags: ['leadership', 'management', 'intelligence émotionnelle', 'équipe'],
    content: `## Les fondamentaux du leadership moderne

### Qu'est-ce que le leadership ?
Le leadership est la capacité à influencer, motiver et guider des individus ou des groupes vers l'atteinte d'objectifs communs. Contrairement au management (qui gère des processus), le leadership gère des personnes et des émotions.

### Les styles de leadership (modèle Goleman)
Daniel Goleman a identifié 6 styles de leadership, chacun adapté à des situations spécifiques.

**Le style visionnaire** inspire par une vision claire et mobilisatrice. Efficace pour initier le changement.

**Le style coach** développe les compétences individuelles sur le long terme. Idéal pour les collaborateurs motivés mais peu expérimentés.

**Le style affiliatif** crée de l'harmonie et renforce les liens. Utile en période de tension ou de crise.

**Le style démocratique** implique l'équipe dans les décisions. Efficace pour générer de l'adhésion et des idées nouvelles.

**Le style meneur de cadence** fixe des standards élevés et montre l'exemple. Efficace avec des équipes compétentes et autonomes, mais épuisant sur la durée.

**Le style directif** donne des instructions claires en situation d'urgence. À utiliser avec parcimonie.

### L'intelligence émotionnelle : le cœur du leadership
Selon Daniel Goleman, l'intelligence émotionnelle (IE) est le facteur le plus déterminant de l'efficacité d'un leader. Elle comprend la conscience de soi (reconnaître ses émotions), la maîtrise de soi (réguler ses émotions), la motivation (se motiver et motiver les autres), l'empathie (comprendre les émotions des autres) et les compétences sociales (gérer les relations).

### Le leadership situationnel (Hersey & Blanchard)
Le modèle situationnel suggère d'adapter son style de leadership au niveau de maturité et de compétence de chaque collaborateur. Un collaborateur débutant a besoin de directives claires. Un collaborateur expérimenté et motivé a besoin d'autonomie.

### Développer son leadership
Le leadership se développe par l'expérience, la réflexion et le feedback. Demandez régulièrement du feedback à votre équipe. Lisez des biographies de leaders inspirants. Trouvez un mentor. Pratiquez la pleine conscience pour développer votre conscience de soi.`
  },

  // ── ÉQUILIBRE VIE PRO/PERSO ────────────────────────────────────────────────
  {
    id: 'equi-1',
    title: 'Trouver son équilibre vie professionnelle / vie personnelle',
    category: 'Équilibre de vie',
    subcategory: 'Bien-être',
    type: 'guide',
    duration: '10 min',
    level: 'Débutant',
    description: 'Stratégies concrètes pour définir et maintenir un équilibre sain entre vie professionnelle et vie personnelle.',
    tags: ['équilibre', 'bien-être', 'télétravail', 'frontières'],
    content: `## Trouver son équilibre vie professionnelle / vie personnelle

### Pourquoi l'équilibre est-il crucial ?
L'équilibre entre vie professionnelle et vie personnelle n'est pas un luxe mais une nécessité pour la performance durable. Les recherches montrent que les personnes qui maintiennent cet équilibre sont plus créatives, plus productives et moins sujettes au burn-out. C'est un investissement dans votre capital santé et dans votre longévité professionnelle.

### Définir vos priorités
La première étape est de clarifier ce qui compte vraiment pour vous. Quelles sont vos valeurs fondamentales ? Qu'est-ce qui vous donne de l'énergie ? Qu'est-ce qui vous en prend ? Cette clarification vous permettra de faire des choix alignés avec vos priorités réelles.

### Poser des frontières claires
Les frontières entre vie pro et vie perso se définissent et se communiquent. Définissez vos horaires de travail et respectez-les. Désactivez les notifications professionnelles en dehors de ces horaires. Créez des rituels de transition (sport, promenade, musique) pour marquer la fin de la journée de travail.

### Gérer le télétravail
Le télétravail brouille souvent les frontières. Pour maintenir l'équilibre : aménagez un espace de travail dédié, définissez des horaires fixes, habillez-vous comme si vous alliez au bureau, faites des pauses régulières et sortez de chez vous au moins une fois par jour.

### La règle des 3 sphères
Visualisez votre vie en 3 sphères : professionnelle, personnelle et sociale. Chaque sphère a besoin d'attention et d'énergie. Si l'une d'elles est négligée trop longtemps, les deux autres en souffrent. Évaluez régulièrement l'équilibre entre ces 3 sphères.

### Dire non : une compétence à développer
Savoir dire non est fondamental pour préserver son équilibre. Apprenez à décliner poliment mais fermement les demandes qui dépassent vos capacités ou qui empiètent sur votre vie personnelle. "Je ne peux pas prendre ce projet en ce moment, mais je pourrais vous aider à partir de..." est une formule efficace.`
  },
];

// ─── CATÉGORIES ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'Toutes les ressources', icon: <Globe size={16} /> },
  { id: 'Création d\'entreprise', label: 'Création d\'entreprise', icon: <Building size={16} /> },
  { id: 'Reconversion professionnelle', label: 'Reconversion', icon: <Compass size={16} /> },
  { id: 'Financement de la formation', label: 'Financement CPF/OPCO', icon: <DollarSign size={16} /> },
  { id: 'Marché du travail', label: 'Marché du travail', icon: <TrendingUp size={16} /> },
  { id: 'VAE', label: 'VAE', icon: <Award size={16} /> },
  { id: 'Développement personnel', label: 'Développement perso', icon: <Heart size={16} /> },
  { id: 'Formation numérique', label: 'Numérique & Digital', icon: <Zap size={16} /> },
  { id: 'Leadership et management', label: 'Leadership', icon: <Users size={16} /> },
  { id: 'Équilibre de vie', label: 'Équilibre de vie', icon: <Coffee size={16} /> },
];

const TYPE_COLORS: Record<string, string> = {
  article: 'bg-blue-500/20 text-blue-400',
  guide: 'bg-violet-500/20 text-violet-400',
  fiche: 'bg-emerald-500/20 text-emerald-400',
  module: 'bg-amber-500/20 text-amber-400',
  checklist: 'bg-cyan-500/20 text-cyan-400',
  outil: 'bg-rose-500/20 text-rose-400',
};

const LEVEL_COLORS: Record<string, string> = {
  'Débutant': 'text-emerald-400',
  'Intermédiaire': 'text-amber-400',
  'Avancé': 'text-rose-400',
};

// ─── COMPOSANT LECTEUR DE RESSOURCE ───────────────────────────────────────────
const ResourceReader: React.FC<{ resource: Resource; onBack: () => void }> = ({ resource, onBack }) => {
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-black text-white mt-8 mb-4 first:mt-0">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-base font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="text-sm font-bold text-neon-pink mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      // Gestion du gras inline
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-sm text-slate-300 leading-relaxed mb-2">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${TYPE_COLORS[resource.type]}`}>{resource.type.toUpperCase()}</span>
            <span className={`text-[10px] font-bold ${LEVEL_COLORS[resource.level]}`}>{resource.level}</span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10} /> {resource.duration}</span>
          </div>
          <h1 className="text-lg font-black text-white">{resource.title}</h1>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <div className="prose prose-invert max-w-none">
          {renderContent(resource.content)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {resource.tags.map(tag => (
          <span key={tag} className="text-[10px] text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            #{tag}
          </span>
        ))}
      </div>

      <div className="text-center text-[10px] text-slate-500 pb-4">
        Ressource EasyBilan · Contenu à titre informatif · Mise à jour régulière
      </div>
    </div>
  );
};

// ─── PAGE PRINCIPALE RESSOURCES ────────────────────────────────────────────────
const Ressources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchCat = selectedCategory === 'all' || r.category === selectedCategory;
      const matchType = selectedType === 'all' || r.type === selectedType;
      const matchSearch = !searchQuery || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchType && matchSearch;
    });
  }, [selectedCategory, searchQuery, selectedType]);

  const featuredResources = RESOURCES.filter(r => r.isFeatured);

  if (selectedResource) {
    return <ResourceReader resource={selectedResource} onBack={() => setSelectedResource(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Centre de Ressources
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explorez, apprenez et formez-vous sur tous les sujets liés à votre projet professionnel.
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Rechercher une ressource, un sujet, un mot-clé..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-pink/50"
        />
      </div>

      {/* Ressources à la une */}
      {!searchQuery && selectedCategory === 'all' && (
        <div>
          <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Star size={14} className="text-neon-pink" />
            Ressources incontournables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map(r => (
              <div
                key={r.id}
                onClick={() => setSelectedResource(r)}
                className="glass-panel rounded-2xl p-5 cursor-pointer hover:border-neon-pink/30 transition-all group border border-neon-pink/10"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${TYPE_COLORS[r.type]}`}>{r.type.toUpperCase()}</span>
                  <Star size={12} className="text-neon-pink" fill="#FF00FF" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-neon-pink transition-colors mb-1">{r.title}</h3>
                <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <Clock size={10} /> {r.duration}
                    <span className={`font-bold ${LEVEL_COLORS[r.level]}`}>{r.level}</span>
                  </div>
                  <span className="text-[11px] font-bold text-neon-pink flex items-center gap-1">
                    Lire <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
                : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filtre par type */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-slate-500 flex items-center gap-1"><Filter size={10} /> Type :</span>
        {['all', 'guide', 'article', 'fiche', 'module', 'outil', 'checklist'].map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              selectedType === t
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-slate-500 hover:bg-white/10'
            }`}
          >
            {t === 'all' ? 'Tous' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <div className="text-xs text-slate-500">
        {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
        {selectedCategory !== 'all' && <span> dans <strong className="text-slate-300">{selectedCategory}</strong></span>}
        {searchQuery && <span> pour <strong className="text-slate-300">"{searchQuery}"</strong></span>}
      </div>

      {/* Liste des ressources */}
      <div className="space-y-3">
        {filteredResources.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Search size={32} className="text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Aucune ressource trouvée pour votre recherche.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedType('all'); }} className="mt-3 text-xs text-neon-pink hover:underline">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          filteredResources.map(r => (
            <div
              key={r.id}
              onClick={() => setSelectedResource(r)}
              className="glass-panel rounded-2xl p-4 cursor-pointer hover:border-white/20 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 flex-shrink-0">
                {r.category === 'Création d\'entreprise' && <Building size={18} />}
                {r.category === 'Reconversion professionnelle' && <Compass size={18} />}
                {r.category === 'Financement de la formation' && <DollarSign size={18} />}
                {r.category === 'Marché du travail' && <TrendingUp size={18} />}
                {r.category === 'VAE' && <Award size={18} />}
                {r.category === 'Développement personnel' && <Heart size={18} />}
                {r.category === 'Formation numérique' && <Zap size={18} />}
                {r.category === 'Leadership et management' && <Users size={18} />}
                {r.category === 'Équilibre de vie' && <Coffee size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${TYPE_COLORS[r.type]}`}>{r.type.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-500">{r.category}</span>
                  {r.isFeatured && <Star size={10} className="text-neon-pink" fill="#FF00FF" />}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-neon-pink transition-colors mb-1 truncate">{r.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">{r.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                  <Clock size={10} /> {r.duration}
                </div>
                <span className={`text-[10px] font-bold ${LEVEL_COLORS[r.level]}`}>{r.level}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Suggestion de contribution */}
      <div className="glass-panel rounded-2xl p-5 border border-neon-pink/10">
        <div className="flex items-start gap-3">
          <Lightbulb size={20} className="text-neon-pink flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Vous ne trouvez pas ce que vous cherchez ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Notre centre de ressources est en constante évolution. Si vous souhaitez des ressources sur un sujet spécifique, parlez-en à votre consultant lors de votre prochaine séance. De nouveaux contenus sont ajoutés régulièrement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ressources;

import React, { useState, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, BarChart2, RadarIcon,
  FileText, Download, RotateCcw, Play, Clock, Star, User,
  Brain, Compass, Heart, Zap, Target, Award, Lightbulb,
  ChevronRight, ChevronDown, TrendingUp, Shield, Coffee,
  Smile, Frown, Meh, AlertCircle, Info, Check, X
} from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Question {
  id: string;
  text: string;
  options?: { value: string | number; label: string }[];
  type: 'likert5' | 'likert7' | 'choice' | 'ranking' | 'open' | 'yesno' | 'scale10';
  dimension?: string;
}

interface TestDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  questionCount: number;
  icon: React.ReactNode;
  color: string;
  category: string;
  questions: Question[];
  interpretations: Record<string, { label: string; description: string; color: string }>;
}

type Answers = Record<string, string | number>;
type TestResults = Record<string, Answers>;

// ─── DONNÉES DES TESTS ────────────────────────────────────────────────────────

const RIASEC_QUESTIONS: Question[] = [
  // Réaliste
  { id: 'r1', text: 'J\'aime travailler avec des outils, des machines ou des équipements techniques.', type: 'likert5', dimension: 'R' },
  { id: 'r2', text: 'Je préfère les activités concrètes et manuelles aux activités abstraites.', type: 'likert5', dimension: 'R' },
  { id: 'r3', text: 'J\'apprécie de construire, réparer ou assembler des objets.', type: 'likert5', dimension: 'R' },
  { id: 'r4', text: 'Je me sens à l\'aise dans des environnements physiques et en plein air.', type: 'likert5', dimension: 'R' },
  // Investigateur
  { id: 'i1', text: 'J\'aime analyser des problèmes complexes et trouver des solutions logiques.', type: 'likert5', dimension: 'I' },
  { id: 'i2', text: 'Je suis attiré(e) par la recherche, les sciences et les nouvelles découvertes.', type: 'likert5', dimension: 'I' },
  { id: 'i3', text: 'J\'aime comprendre le fonctionnement des choses en profondeur.', type: 'likert5', dimension: 'I' },
  { id: 'i4', text: 'Je préfère observer et analyser plutôt qu\'agir rapidement.', type: 'likert5', dimension: 'I' },
  // Artistique
  { id: 'a1', text: 'J\'aime créer, inventer et m\'exprimer de manière originale.', type: 'likert5', dimension: 'A' },
  { id: 'a2', text: 'Je suis sensible à l\'esthétique, à l\'art, à la musique ou à la littérature.', type: 'likert5', dimension: 'A' },
  { id: 'a3', text: 'J\'apprécie les activités qui laissent place à l\'imagination et à la créativité.', type: 'likert5', dimension: 'A' },
  { id: 'a4', text: 'Je préfère les environnements de travail peu structurés et flexibles.', type: 'likert5', dimension: 'A' },
  // Social
  { id: 's1', text: 'J\'aime aider, enseigner ou accompagner les autres.', type: 'likert5', dimension: 'S' },
  { id: 's2', text: 'Je me sens épanoui(e) dans les activités de groupe et les interactions humaines.', type: 'likert5', dimension: 'S' },
  { id: 's3', text: 'J\'apprécie les métiers de soin, d\'éducation ou de conseil.', type: 'likert5', dimension: 'S' },
  { id: 's4', text: 'Je suis à l\'aise pour communiquer et créer des liens avec les autres.', type: 'likert5', dimension: 'S' },
  // Entreprenant
  { id: 'e1', text: 'J\'aime diriger, convaincre et influencer les autres.', type: 'likert5', dimension: 'E' },
  { id: 'e2', text: 'Je suis attiré(e) par les défis commerciaux, la négociation et le leadership.', type: 'likert5', dimension: 'E' },
  { id: 'e3', text: 'J\'aime prendre des risques calculés et saisir des opportunités.', type: 'likert5', dimension: 'E' },
  { id: 'e4', text: 'Je me vois bien dans un rôle de manager ou d\'entrepreneur.', type: 'likert5', dimension: 'E' },
  // Conventionnel
  { id: 'c1', text: 'J\'aime les activités ordonnées, structurées et méthodiques.', type: 'likert5', dimension: 'C' },
  { id: 'c2', text: 'Je me sens à l\'aise dans les environnements avec des règles claires.', type: 'likert5', dimension: 'C' },
  { id: 'c3', text: 'J\'apprécie les tâches administratives, comptables ou de gestion de données.', type: 'likert5', dimension: 'C' },
  { id: 'c4', text: 'Je préfère suivre des procédures établies plutôt qu\'improviser.', type: 'likert5', dimension: 'C' },
];

const BIG5_QUESTIONS: Question[] = [
  // Ouverture
  { id: 'o1', text: 'J\'ai une imagination débordante et j\'aime explorer de nouvelles idées.', type: 'likert5', dimension: 'O' },
  { id: 'o2', text: 'Je suis curieux(se) de nombreuses choses différentes.', type: 'likert5', dimension: 'O' },
  { id: 'o3', text: 'J\'apprécie l\'art, la musique et la littérature.', type: 'likert5', dimension: 'O' },
  { id: 'o4', text: 'J\'aime réfléchir à des concepts abstraits et philosophiques.', type: 'likert5', dimension: 'O' },
  // Conscienciosité
  { id: 'co1', text: 'Je suis organisé(e) et j\'aime avoir un plan pour tout.', type: 'likert5', dimension: 'C' },
  { id: 'co2', text: 'Je suis fiable et je respecte toujours mes engagements.', type: 'likert5', dimension: 'C' },
  { id: 'co3', text: 'Je travaille dur et je persévère jusqu\'à atteindre mes objectifs.', type: 'likert5', dimension: 'C' },
  { id: 'co4', text: 'Je suis attentif(ve) aux détails et minutieux(se) dans mon travail.', type: 'likert5', dimension: 'C' },
  // Extraversion
  { id: 'ex1', text: 'Je me sens plein(e) d\'énergie en présence des autres.', type: 'likert5', dimension: 'E' },
  { id: 'ex2', text: 'J\'aime être le centre de l\'attention dans les groupes.', type: 'likert5', dimension: 'E' },
  { id: 'ex3', text: 'Je parle facilement à des inconnus et j\'aime faire de nouvelles rencontres.', type: 'likert5', dimension: 'E' },
  { id: 'ex4', text: 'Je suis enthousiaste et j\'exprime facilement mes émotions positives.', type: 'likert5', dimension: 'E' },
  // Agréabilité
  { id: 'ag1', text: 'Je fais confiance aux autres et je suppose le meilleur de leurs intentions.', type: 'likert5', dimension: 'A' },
  { id: 'ag2', text: 'Je suis empathique et je me soucie du bien-être des autres.', type: 'likert5', dimension: 'A' },
  { id: 'ag3', text: 'J\'évite les conflits et je cherche des compromis.', type: 'likert5', dimension: 'A' },
  { id: 'ag4', text: 'Je suis généreux(se) et j\'aime aider les autres sans attendre de retour.', type: 'likert5', dimension: 'A' },
  // Névrosisme
  { id: 'n1', text: 'Je me sens souvent anxieux(se) ou inquiet(e) sans raison apparente.', type: 'likert5', dimension: 'N' },
  { id: 'n2', text: 'Je suis facilement perturbé(e) par les événements stressants.', type: 'likert5', dimension: 'N' },
  { id: 'n3', text: 'Mes humeurs changent fréquemment et de manière imprévisible.', type: 'likert5', dimension: 'N' },
  { id: 'n4', text: 'Je ressens souvent des émotions négatives comme la tristesse ou la colère.', type: 'likert5', dimension: 'N' },
];

const VALEURS_QUESTIONS: Question[] = [
  { id: 'v1', text: 'L\'autonomie dans mon travail (liberté d\'organiser mon temps et mes méthodes)', type: 'scale10', dimension: 'Autonomie' },
  { id: 'v2', text: 'La sécurité de l\'emploi et la stabilité financière', type: 'scale10', dimension: 'Sécurité' },
  { id: 'v3', text: 'La reconnaissance et le prestige social de mon métier', type: 'scale10', dimension: 'Reconnaissance' },
  { id: 'v4', text: 'L\'impact positif sur la société et l\'utilité de mon travail', type: 'scale10', dimension: 'Utilité' },
  { id: 'v5', text: 'L\'équilibre entre vie professionnelle et vie personnelle', type: 'scale10', dimension: 'Équilibre' },
  { id: 'v6', text: 'Le défi intellectuel et l\'apprentissage continu', type: 'scale10', dimension: 'Défi' },
  { id: 'v7', text: 'Les relations humaines de qualité avec mes collègues et clients', type: 'scale10', dimension: 'Relations' },
  { id: 'v8', text: 'La créativité et l\'innovation dans mon travail', type: 'scale10', dimension: 'Créativité' },
  { id: 'v9', text: 'Le leadership et la responsabilité managériale', type: 'scale10', dimension: 'Leadership' },
  { id: 'v10', text: 'La rémunération et les avantages financiers', type: 'scale10', dimension: 'Rémunération' },
];

const MOTIVATIONS_QUESTIONS: Question[] = [
  { id: 'm1', text: 'Je suis davantage motivé(e) par la récompense externe (salaire, reconnaissance) que par le plaisir intrinsèque du travail.', type: 'likert5', dimension: 'Extrinsèque' },
  { id: 'm2', text: 'Je travaille mieux quand je fixe moi-même mes objectifs.', type: 'likert5', dimension: 'Autonomie' },
  { id: 'm3', text: 'La compétition avec les autres me stimule et me pousse à me dépasser.', type: 'likert5', dimension: 'Compétition' },
  { id: 'm4', text: 'Je suis motivé(e) par la perspective d\'apprendre de nouvelles compétences.', type: 'likert5', dimension: 'Apprentissage' },
  { id: 'm5', text: 'Le sentiment d\'appartenir à une équipe soudée est important pour ma motivation.', type: 'likert5', dimension: 'Appartenance' },
  { id: 'm6', text: 'Je suis davantage motivé(e) par le sens de ma mission que par le salaire.', type: 'likert5', dimension: 'Sens' },
  { id: 'm7', text: 'Les défis difficiles me dynamisent plutôt qu\'ils ne me découragent.', type: 'likert5', dimension: 'Défi' },
  { id: 'm8', text: 'La stabilité et la routine me conviennent mieux que le changement permanent.', type: 'likert5', dimension: 'Stabilité' },
  { id: 'm9', text: 'Je suis motivé(e) quand je vois l\'impact concret de mon travail.', type: 'likert5', dimension: 'Impact' },
  { id: 'm10', text: 'L\'avancement hiérarchique et le statut sont des moteurs importants pour moi.', type: 'likert5', dimension: 'Statut' },
];

const SOFTSKILLS_QUESTIONS: Question[] = [
  { id: 'ss1', text: 'Communication orale : Je m\'exprime clairement et de manière convaincante.', type: 'scale10', dimension: 'Communication' },
  { id: 'ss2', text: 'Écoute active : Je comprends vraiment ce que les autres expriment, au-delà des mots.', type: 'scale10', dimension: 'Écoute' },
  { id: 'ss3', text: 'Gestion du stress : Je reste calme et efficace sous pression.', type: 'scale10', dimension: 'Résilience' },
  { id: 'ss4', text: 'Adaptabilité : Je m\'adapte facilement aux changements et aux nouvelles situations.', type: 'scale10', dimension: 'Adaptabilité' },
  { id: 'ss5', text: 'Résolution de problèmes : Je trouve des solutions créatives face aux obstacles.', type: 'scale10', dimension: 'Résolution' },
  { id: 'ss6', text: 'Travail en équipe : Je collabore efficacement et je contribue positivement au groupe.', type: 'scale10', dimension: 'Collaboration' },
  { id: 'ss7', text: 'Leadership : Je sais motiver et guider les autres vers un objectif commun.', type: 'scale10', dimension: 'Leadership' },
  { id: 'ss8', text: 'Gestion du temps : Je priorise efficacement et je respecte les délais.', type: 'scale10', dimension: 'Organisation' },
  { id: 'ss9', text: 'Intelligence émotionnelle : Je reconnais et gère mes émotions et celles des autres.', type: 'scale10', dimension: 'IE' },
  { id: 'ss10', text: 'Créativité : Je génère régulièrement des idées nouvelles et originales.', type: 'scale10', dimension: 'Créativité' },
  { id: 'ss11', text: 'Esprit critique : J\'analyse les situations avec recul et objectivité.', type: 'scale10', dimension: 'Analyse' },
  { id: 'ss12', text: 'Autonomie : Je travaille efficacement sans avoir besoin d\'être encadré(e) en permanence.', type: 'scale10', dimension: 'Autonomie' },
];

const BURNOUT_QUESTIONS: Question[] = [
  { id: 'b1', text: 'Je me sens épuisé(e) émotionnellement par mon travail.', type: 'likert5', dimension: 'Épuisement' },
  { id: 'b2', text: 'Je me sens "vidé(e)" à la fin d\'une journée de travail.', type: 'likert5', dimension: 'Épuisement' },
  { id: 'b3', text: 'Je me sens fatigué(e) dès le matin à l\'idée d\'une nouvelle journée de travail.', type: 'likert5', dimension: 'Épuisement' },
  { id: 'b4', text: 'Je suis devenu(e) plus indifférent(e) aux personnes que je côtoie dans mon travail.', type: 'likert5', dimension: 'Dépersonnalisation' },
  { id: 'b5', text: 'Je traite certains collègues ou clients comme des objets impersonnels.', type: 'likert5', dimension: 'Dépersonnalisation' },
  { id: 'b6', text: 'Je me sens moins impliqué(e) dans mon travail qu\'avant.', type: 'likert5', dimension: 'Dépersonnalisation' },
  { id: 'b7', text: 'J\'ai l\'impression d\'accomplir des choses utiles dans mon travail.', type: 'likert5', dimension: 'Accomplissement' },
  { id: 'b8', text: 'Je me sens plein(e) d\'énergie dans mon travail.', type: 'likert5', dimension: 'Accomplissement' },
  { id: 'b9', text: 'Je résous efficacement les problèmes qui se posent dans mon travail.', type: 'likert5', dimension: 'Accomplissement' },
  { id: 'b10', text: 'J\'ai l\'impression de contribuer positivement à la vie des autres par mon travail.', type: 'likert5', dimension: 'Accomplissement' },
];

const INTELLIGENCE_MULTIPLE_QUESTIONS: Question[] = [
  { id: 'im1', text: 'J\'apprends mieux en lisant et en écrivant qu\'en écoutant.', type: 'likert5', dimension: 'Linguistique' },
  { id: 'im2', text: 'Je suis à l\'aise avec les chiffres, les statistiques et le raisonnement logique.', type: 'likert5', dimension: 'Logico-mathématique' },
  { id: 'im3', text: 'Je pense souvent en images et je me repère facilement dans l\'espace.', type: 'likert5', dimension: 'Spatiale' },
  { id: 'im4', text: 'J\'apprends mieux en faisant, en manipulant et en bougeant.', type: 'likert5', dimension: 'Kinesthésique' },
  { id: 'im5', text: 'La musique et les rythmes m\'aident à mémoriser et à me concentrer.', type: 'likert5', dimension: 'Musicale' },
  { id: 'im6', text: 'Je comprends facilement les émotions et les motivations des autres.', type: 'likert5', dimension: 'Interpersonnelle' },
  { id: 'im7', text: 'Je me connais bien et je comprends mes propres émotions et motivations.', type: 'likert5', dimension: 'Intrapersonnelle' },
  { id: 'im8', text: 'Je suis sensible à la nature, aux animaux et aux phénomènes naturels.', type: 'likert5', dimension: 'Naturaliste' },
];

// ─── DÉFINITIONS DES TESTS ─────────────────────────────────────────────────────
const TESTS: TestDefinition[] = [
  {
    id: 'riasec',
    title: 'Test RIASEC (Holland)',
    subtitle: 'Profil d\'intérêts professionnels',
    description: 'Basé sur la théorie de John Holland, ce test identifie votre profil parmi 6 types d\'intérêts professionnels : Réaliste, Investigateur, Artistique, Social, Entreprenant et Conventionnel. Il est l\'un des outils les plus utilisés en orientation professionnelle dans le monde.',
    duration: '12 min',
    questionCount: 24,
    icon: <Compass size={20} />,
    color: 'from-violet-500 to-purple-600',
    category: 'Intérêts professionnels',
    questions: RIASEC_QUESTIONS,
    interpretations: {
      R: { label: 'Réaliste', description: 'Vous aimez le travail concret, manuel et technique. Vous êtes pragmatique et appréciez les résultats tangibles.', color: '#3B82F6' },
      I: { label: 'Investigateur', description: 'Vous êtes curieux, analytique et aimez résoudre des problèmes complexes. La recherche et l\'analyse vous attirent.', color: '#8B5CF6' },
      A: { label: 'Artistique', description: 'Vous êtes créatif, expressif et aimez l\'originalité. Les environnements peu structurés vous conviennent.', color: '#EC4899' },
      S: { label: 'Social', description: 'Vous aimez aider, enseigner et interagir avec les autres. Les métiers de service et d\'accompagnement vous correspondent.', color: '#10B981' },
      E: { label: 'Entreprenant', description: 'Vous aimez diriger, convaincre et prendre des initiatives. Le leadership et l\'entrepreneuriat vous attirent.', color: '#F59E0B' },
      C: { label: 'Conventionnel', description: 'Vous appréciez l\'ordre, la structure et la précision. Les environnements organisés et les procédures claires vous conviennent.', color: '#06B6D4' },
    },
  },
  {
    id: 'big5',
    title: 'Big Five (OCEAN)',
    subtitle: 'Traits de personnalité professionnelle',
    description: 'Le modèle des Cinq Grands Facteurs de personnalité est le modèle le plus validé scientifiquement en psychologie. Il évalue 5 dimensions fondamentales : Ouverture, Conscienciosité, Extraversion, Agréabilité et Névrosisme (stabilité émotionnelle).',
    duration: '10 min',
    questionCount: 20,
    icon: <Brain size={20} />,
    color: 'from-blue-500 to-cyan-600',
    category: 'Personnalité',
    questions: BIG5_QUESTIONS,
    interpretations: {
      O: { label: 'Ouverture', description: 'Curiosité intellectuelle, créativité, sensibilité à l\'esthétique et ouverture aux nouvelles expériences.', color: '#8B5CF6' },
      C: { label: 'Conscienciosité', description: 'Organisation, fiabilité, persévérance et sens du devoir. Indicateur fort de réussite professionnelle.', color: '#3B82F6' },
      E: { label: 'Extraversion', description: 'Sociabilité, assertivité, enthousiasme et recherche de stimulation sociale.', color: '#F59E0B' },
      A: { label: 'Agréabilité', description: 'Coopération, empathie, confiance et altruisme. Facilite le travail en équipe.', color: '#10B981' },
      N: { label: 'Stabilité émotionnelle', description: 'Gestion des émotions négatives, résistance au stress et équilibre psychologique.', color: '#EC4899' },
    },
  },
  {
    id: 'valeurs',
    title: 'Inventaire des Valeurs Professionnelles',
    subtitle: 'Ce qui compte vraiment pour vous',
    description: 'Cet inventaire identifie vos valeurs professionnelles fondamentales — les éléments non négociables qui doivent être présents dans votre travail pour que vous vous sentiez épanoui(e). Il est essentiel pour évaluer l\'adéquation entre un poste et vos besoins profonds.',
    duration: '8 min',
    questionCount: 10,
    icon: <Heart size={20} />,
    color: 'from-rose-500 to-pink-600',
    category: 'Valeurs',
    questions: VALEURS_QUESTIONS,
    interpretations: {},
  },
  {
    id: 'motivations',
    title: 'Profil Motivationnel',
    subtitle: 'Vos moteurs d\'engagement',
    description: 'Ce test explore vos sources de motivation intrinsèque et extrinsèque, basé sur la théorie de l\'autodétermination (Deci & Ryan) et le modèle de Herzberg. Il identifie ce qui vous donne de l\'énergie et ce qui vous en prend dans votre vie professionnelle.',
    duration: '8 min',
    questionCount: 10,
    icon: <Zap size={20} />,
    color: 'from-amber-500 to-orange-600',
    category: 'Motivation',
    questions: MOTIVATIONS_QUESTIONS,
    interpretations: {},
  },
  {
    id: 'softskills',
    title: 'Auto-évaluation des Soft Skills',
    subtitle: 'Vos compétences comportementales',
    description: 'Évaluez vos 12 compétences comportementales clés (soft skills) selon les référentiels les plus récents du marché du travail. Ce test permet d\'identifier vos forces naturelles et les axes de développement prioritaires.',
    duration: '10 min',
    questionCount: 12,
    icon: <Award size={20} />,
    color: 'from-emerald-500 to-teal-600',
    category: 'Compétences',
    questions: SOFTSKILLS_QUESTIONS,
    interpretations: {},
  },
  {
    id: 'burnout',
    title: 'Indicateur de Risque Burn-out (MBI)',
    subtitle: 'Évaluation de l\'épuisement professionnel',
    description: 'Adapté du Maslach Burnout Inventory (MBI), cet outil évalue trois dimensions du burn-out : l\'épuisement émotionnel, la dépersonnalisation et la réduction du sentiment d\'accomplissement. Il permet une prise de conscience préventive.',
    duration: '8 min',
    questionCount: 10,
    icon: <Shield size={20} />,
    color: 'from-red-500 to-rose-600',
    category: 'Bien-être',
    questions: BURNOUT_QUESTIONS,
    interpretations: {
      Épuisement: { label: 'Épuisement émotionnel', description: 'Sentiment d\'être émotionnellement à bout, vidé(e) de ses ressources.', color: '#EF4444' },
      Dépersonnalisation: { label: 'Dépersonnalisation', description: 'Attitude de détachement cynique envers le travail et les personnes.', color: '#F97316' },
      Accomplissement: { label: 'Accomplissement personnel', description: 'Sentiment de compétence et de réalisation dans son travail.', color: '#10B981' },
    },
  },
  {
    id: 'intelligences',
    title: 'Intelligences Multiples (Gardner)',
    subtitle: 'Votre profil d\'apprentissage',
    description: 'Basé sur la théorie des Intelligences Multiples de Howard Gardner, ce test identifie vos formes d\'intelligence dominantes parmi 8 types. Il permet de mieux comprendre vos modes d\'apprentissage préférentiels et les environnements de travail qui vous correspondent.',
    duration: '8 min',
    questionCount: 8,
    icon: <Lightbulb size={20} />,
    color: 'from-cyan-500 to-sky-600',
    category: 'Apprentissage',
    questions: INTELLIGENCE_MULTIPLE_QUESTIONS,
    interpretations: {},
  },
];

// ─── CONSTANTES ────────────────────────────────────────────────────────────────
const LIKERT5_OPTIONS = [
  { value: 1, label: 'Pas du tout d\'accord' },
  { value: 2, label: 'Plutôt pas d\'accord' },
  { value: 3, label: 'Neutre' },
  { value: 4, label: 'Plutôt d\'accord' },
  { value: 5, label: 'Tout à fait d\'accord' },
];

// ─── COMPOSANT GRAPHIQUE RADAR SVG ─────────────────────────────────────────────
const RadarChart: React.FC<{ data: { label: string; value: number; color: string }[]; maxValue?: number }> = ({ data, maxValue = 100 }) => {
  const size = 220;
  const center = size / 2;
  const radius = 85;
  const n = data.length;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = radius + 22;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const gridLevels = [20, 40, 60, 80, 100];
  const gridPolygons = gridLevels.map(level => {
    const points = data.map((_, i) => {
      const p = getPoint(i, level);
      return `${p.x},${p.y}`;
    }).join(' ');
    return points;
  });

  const dataPoints = data.map((d, i) => {
    const p = getPoint(i, (d.value / maxValue) * 100);
    return `${p.x},${p.y}`;
  }).join(' ');

  const axisLines = data.map((_, i) => {
    const end = getPoint(i, 100);
    return { x1: center, y1: center, x2: end.x, y2: end.y };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grille */}
      {gridPolygons.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {/* Axes */}
      {axisLines.map((line, i) => (
        <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}
      {/* Données */}
      <polygon points={dataPoints} fill="rgba(236,72,153,0.2)" stroke="#EC4899" strokeWidth="2" />
      {/* Points */}
      {data.map((d, i) => {
        const p = getPoint(i, (d.value / maxValue) * 100);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill={d.color || '#EC4899'} stroke="white" strokeWidth="1.5" />;
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const lp = getLabelPoint(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="bold">
            {d.label.length > 10 ? d.label.substring(0, 9) + '.' : d.label}
          </text>
        );
      })}
    </svg>
  );
};

// ─── COMPOSANT GRAPHIQUE BARRES ────────────────────────────────────────────────
const BarChart: React.FC<{ data: { label: string; value: number; color: string; maxValue?: number }[] }> = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.maxValue || d.value), 100);
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-bold text-slate-300">{d.label}</span>
            <span className="text-[11px] font-black text-white">{Math.round(d.value)}<span className="text-slate-500 text-[9px]">/{d.maxValue || 100}</span></span>
          </div>
          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(d.value / maxVal) * 100}%`, backgroundColor: d.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── COMPOSANT JAUGE ──────────────────────────────────────────────────────────
const GaugeChart: React.FC<{ value: number; label: string; color: string; maxValue?: number }> = ({ value, label, color, maxValue = 100 }) => {
  const pct = Math.min((value / maxValue) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="60" viewBox="0 0 100 60">
        <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 125.6} 125.6`}
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text x="50" y="52" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{Math.round(pct)}%</text>
      </svg>
      <span className="text-[10px] text-slate-400 text-center font-semibold">{label}</span>
    </div>
  );
};

// ─── CALCUL DES SCORES ─────────────────────────────────────────────────────────
const computeRIASEC = (answers: Answers) => {
  const dims = ['R', 'I', 'A', 'S', 'E', 'C'];
  const scores: Record<string, number> = {};
  dims.forEach(d => {
    const qs = RIASEC_QUESTIONS.filter(q => q.dimension === d);
    const sum = qs.reduce((acc, q) => acc + (Number(answers[q.id]) || 0), 0);
    scores[d] = Math.round((sum / (qs.length * 5)) * 100);
  });
  return scores;
};

const computeBig5 = (answers: Answers) => {
  const dims = ['O', 'C', 'E', 'A', 'N'];
  const scores: Record<string, number> = {};
  dims.forEach(d => {
    const qs = BIG5_QUESTIONS.filter(q => q.dimension === d);
    const sum = qs.reduce((acc, q) => acc + (Number(answers[q.id]) || 0), 0);
    scores[d] = Math.round((sum / (qs.length * 5)) * 100);
  });
  // Inverser le névrosisme pour afficher la stabilité émotionnelle
  scores['N'] = 100 - scores['N'];
  return scores;
};

const computeValeurs = (answers: Answers) => {
  const scores: Record<string, number> = {};
  VALEURS_QUESTIONS.forEach(q => {
    scores[q.dimension!] = Number(answers[q.id]) || 0;
  });
  return scores;
};

const computeMotivations = (answers: Answers) => {
  const scores: Record<string, number> = {};
  MOTIVATIONS_QUESTIONS.forEach(q => {
    scores[q.dimension!] = Math.round(((Number(answers[q.id]) || 0) / 5) * 100);
  });
  return scores;
};

const computeSoftSkills = (answers: Answers) => {
  const scores: Record<string, number> = {};
  SOFTSKILLS_QUESTIONS.forEach(q => {
    scores[q.dimension!] = Number(answers[q.id]) || 0;
  });
  return scores;
};

const computeBurnout = (answers: Answers) => {
  const epuisement = ['b1', 'b2', 'b3'].reduce((acc, id) => acc + (Number(answers[id]) || 0), 0);
  const deperso = ['b4', 'b5', 'b6'].reduce((acc, id) => acc + (Number(answers[id]) || 0), 0);
  const accomplissement = ['b7', 'b8', 'b9', 'b10'].reduce((acc, id) => acc + (Number(answers[id]) || 0), 0);
  return {
    Épuisement: Math.round((epuisement / 15) * 100),
    Dépersonnalisation: Math.round((deperso / 15) * 100),
    Accomplissement: Math.round((accomplissement / 20) * 100),
  };
};

const computeIntelligences = (answers: Answers) => {
  const scores: Record<string, number> = {};
  INTELLIGENCE_MULTIPLE_QUESTIONS.forEach(q => {
    scores[q.dimension!] = Math.round(((Number(answers[q.id]) || 0) / 5) * 100);
  });
  return scores;
};

// ─── GÉNÉRATION DES ANALYSES TEXTUELLES ───────────────────────────────────────
const generateRIASECAnalysis = (scores: Record<string, number>) => {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([k]) => k);
  const code = top3.join('');
  const labels: Record<string, string> = { R: 'Réaliste', I: 'Investigateur', A: 'Artistique', S: 'Social', E: 'Entreprenant', C: 'Conventionnel' };
  const metiers: Record<string, string[]> = {
    R: ['Technicien', 'Ingénieur', 'Artisan', 'Agriculteur', 'Mécanicien'],
    I: ['Chercheur', 'Médecin', 'Analyste', 'Informaticien', 'Biologiste'],
    A: ['Designer', 'Architecte', 'Musicien', 'Journaliste', 'Photographe'],
    S: ['Enseignant', 'Psychologue', 'Infirmier', 'Travailleur social', 'Coach'],
    E: ['Manager', 'Commercial', 'Entrepreneur', 'Avocat', 'Directeur'],
    C: ['Comptable', 'Administrateur', 'Secrétaire', 'Gestionnaire', 'Contrôleur'],
  };
  return {
    code,
    top3Labels: top3.map(k => labels[k]),
    metiersSuggeres: [...new Set(top3.flatMap(k => metiers[k]))].slice(0, 8),
    analyse: `Votre code RIASEC dominant est **${code}** (${top3.map(k => labels[k]).join(' - ')}). Ce profil révèle une personnalité qui ${
      top3[0] === 'S' ? 'trouve son épanouissement dans le contact humain et l\'aide aux autres' :
      top3[0] === 'I' ? 'est naturellement attirée par l\'analyse, la recherche et la résolution de problèmes complexes' :
      top3[0] === 'E' ? 'possède un fort tempérament de leader et d\'entrepreneur' :
      top3[0] === 'A' ? 'exprime sa singularité à travers la créativité et l\'originalité' :
      top3[0] === 'R' ? 'préfère le concret, le tangible et le travail manuel ou technique' :
      'apprécie l\'ordre, la structure et la précision dans ses activités'
    }. La combinaison de vos trois types dominants crée un profil unique qui oriente vers des environnements professionnels spécifiques.`,
  };
};

const generateBig5Analysis = (scores: Record<string, number>) => {
  const labels: Record<string, string> = { O: 'Ouverture', C: 'Conscienciosité', E: 'Extraversion', A: 'Agréabilité', N: 'Stabilité émotionnelle' };
  const points: string[] = [];
  if (scores['O'] >= 70) points.push('Votre forte ouverture d\'esprit vous rend particulièrement adaptable aux environnements changeants et innovants.');
  if (scores['C'] >= 70) points.push('Votre haute conscienciosité est un prédicteur fort de réussite professionnelle — vous êtes fiable, organisé(e) et persévérant(e).');
  if (scores['E'] >= 70) points.push('Votre extraversion élevée vous permet de vous épanouir dans les rôles de contact, de vente et de management.');
  if (scores['E'] <= 40) points.push('Votre introversion est une force dans les métiers nécessitant concentration, analyse approfondie et travail autonome.');
  if (scores['A'] >= 70) points.push('Votre agréabilité élevée facilite le travail en équipe et les relations de confiance avec vos collègues et clients.');
  if (scores['N'] >= 70) points.push('Votre stabilité émotionnelle vous permet de maintenir votre performance même sous pression.');
  if (scores['N'] <= 40) points.push('Votre sensibilité émotionnelle mérite une attention particulière : des stratégies de gestion du stress seraient bénéfiques.');
  return points.length > 0 ? points : ['Votre profil Big Five révèle un équilibre entre les différentes dimensions de la personnalité.'];
};

const generateBurnoutAnalysis = (scores: Record<string, number>) => {
  const epuisement = scores['Épuisement'];
  const deperso = scores['Dépersonnalisation'];
  const accomplissement = scores['Accomplissement'];
  let niveau = 'faible';
  let couleur = 'emerald';
  let message = '';
  if (epuisement > 70 || deperso > 70 || accomplissement < 30) {
    niveau = 'élevé';
    couleur = 'red';
    message = 'Les indicateurs suggèrent un risque élevé d\'épuisement professionnel. Il est fortement recommandé de consulter un médecin ou un psychologue du travail rapidement. Ce bilan de compétences est une étape importante pour envisager un changement.';
  } else if (epuisement > 50 || deperso > 50 || accomplissement < 50) {
    niveau = 'modéré';
    couleur = 'amber';
    message = 'Des signaux d\'alerte sont présents. Votre situation mérite une attention particulière. Le bilan de compétences peut vous aider à identifier les sources de mal-être et à construire un projet professionnel plus épanouissant.';
  } else {
    message = 'Votre niveau de bien-être professionnel semble satisfaisant. Ce bilan vous permettra néanmoins d\'optimiser votre épanouissement et d\'anticiper les évolutions de votre carrière.';
  }
  return { niveau, couleur, message };
};

// ─── COMPOSANT RAPPORT ────────────────────────────────────────────────────────
const TestReport: React.FC<{ testId: string; answers: Answers; onBack: () => void }> = ({ testId, answers, onBack }) => {
  const test = TESTS.find(t => t.id === testId)!;

  const renderRIASECReport = () => {
    const scores = computeRIASEC(answers);
    const analysis = generateRIASECAnalysis(scores);
    const radarData = Object.entries(scores).map(([k, v]) => ({
      label: test.interpretations[k]?.label || k,
      value: v,
      color: test.interpretations[k]?.color || '#EC4899',
    }));
    const barData = Object.entries(scores).map(([k, v]) => ({
      label: test.interpretations[k]?.label || k,
      value: v,
      color: test.interpretations[k]?.color || '#EC4899',
    }));
    const top3 = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3);

    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-5 border border-violet-500/20">
          <h3 className="text-sm font-black text-white mb-1">Code RIASEC : <span className="text-violet-400 text-lg">{analysis.code}</span></h3>
          <p className="text-xs text-slate-400 leading-relaxed">{analysis.analyse.replace(/\*\*/g, '')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3 text-center">Profil Radar</h4>
            <RadarChart data={radarData} maxValue={100} />
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3">Scores par dimension</h4>
            <BarChart data={barData} />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3">Vos 3 types dominants</h4>
          <div className="space-y-3">
            {top3.map(([k, v], i) => (
              <div key={k} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: test.interpretations[k]?.color }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{test.interpretations[k]?.label}</span>
                    <span className="text-xs font-black" style={{ color: test.interpretations[k]?.color }}>{v}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{test.interpretations[k]?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3 flex items-center gap-2">
            <Target size={14} className="text-violet-400" /> Métiers suggérés
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.metiersSuggeres.map(m => (
              <span key={m} className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1 rounded-full font-semibold">{m}</span>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-violet-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-violet-400" /> Analyse psychologique
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            La théorie de Holland postule que les individus s'épanouissent professionnellement lorsque leur environnement de travail correspond à leur type de personnalité. Votre code <strong className="text-violet-300">{analysis.code}</strong> indique une congruence optimale avec des environnements qui valorisent {analysis.top3Labels.join(', ')}. Les recherches montrent que plus la congruence personne-environnement est élevée, plus la satisfaction au travail, la performance et la stabilité professionnelle sont importantes.
          </p>
        </div>
      </div>
    );
  };

  const renderBig5Report = () => {
    const scores = computeBig5(answers);
    const analysisPoints = generateBig5Analysis(scores);
    const labels: Record<string, string> = { O: 'Ouverture', C: 'Conscienciosité', E: 'Extraversion', A: 'Agréabilité', N: 'Stabilité émot.' };
    const colors: Record<string, string> = { O: '#8B5CF6', C: '#3B82F6', E: '#F59E0B', A: '#10B981', N: '#EC4899' };
    const radarData = Object.entries(scores).map(([k, v]) => ({ label: labels[k], value: v, color: colors[k] }));
    const barData = Object.entries(scores).map(([k, v]) => ({ label: labels[k], value: v, color: colors[k] }));

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3 text-center">Profil OCEAN</h4>
            <RadarChart data={radarData} maxValue={100} />
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3">Scores Big Five</h4>
            <BarChart data={barData} />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3 flex items-center gap-2">
            <Brain size={14} className="text-blue-400" /> Analyse de votre profil
          </h4>
          <div className="space-y-2">
            {analysisPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Object.entries(scores).map(([k, v]) => (
            <GaugeChart key={k} value={v} label={labels[k]} color={colors[k]} maxValue={100} />
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-blue-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-blue-400" /> Note du psychologue du travail
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Le modèle Big Five est le plus robuste scientifiquement en psychologie de la personnalité, avec plus de 50 ans de recherches validées dans des contextes culturels variés. La <strong className="text-blue-300">Conscienciosité</strong> est le prédicteur le plus fort de la performance au travail, tandis que l'<strong className="text-blue-300">Extraversion</strong> prédit mieux la réussite dans les métiers de contact. La <strong className="text-blue-300">Stabilité émotionnelle</strong> est un facteur protecteur contre le burn-out. Ces traits sont relativement stables dans le temps mais peuvent évoluer avec les expériences de vie significatives.
          </p>
        </div>
      </div>
    );
  };

  const renderValeursReport = () => {
    const scores = computeValeurs(answers);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const colors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#06B6D4', '#EF4444', '#F97316', '#84CC16', '#A78BFA'];
    const barData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i % colors.length] }));

    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-4">Hiérarchie de vos valeurs professionnelles</h4>
          <BarChart data={barData} />
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3">Vos 3 valeurs fondamentales</h4>
          <div className="space-y-3">
            {sorted.slice(0, 3).map(([k, v], i) => (
              <div key={k} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white" style={{ backgroundColor: colors[i] }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-white">{k}</span>
                    <span className="text-xs font-black" style={{ color: colors[i] }}>{v}/10</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full mt-1">
                    <div className="h-full rounded-full" style={{ width: `${v * 10}%`, backgroundColor: colors[i] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-rose-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-rose-400" /> Analyse psychologique
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Vos valeurs professionnelles dominantes (<strong className="text-rose-300">{sorted.slice(0, 3).map(([k]) => k).join(', ')}</strong>) constituent le socle de votre épanouissement au travail. Selon la théorie de l'adéquation personne-environnement (Person-Environment Fit), la satisfaction professionnelle est maximale lorsque les valeurs individuelles sont alignées avec la culture et les pratiques de l'organisation. Un écart important entre vos valeurs et votre environnement de travail actuel peut être une source significative de mal-être et de désengagement.
          </p>
        </div>
      </div>
    );
  };

  const renderMotivationsReport = () => {
    const scores = computeMotivations(answers);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const colors = ['#F59E0B', '#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#06B6D4', '#EF4444', '#F97316', '#84CC16', '#A78BFA'];
    const barData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i % colors.length] }));
    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3);

    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-4">Profil motivationnel complet</h4>
          <BarChart data={barData} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-[11px] font-black text-emerald-400 mb-3 flex items-center gap-1.5">
              <TrendingUp size={12} /> Moteurs principaux
            </h4>
            <div className="space-y-2">
              {top3.map(([k, v], i) => (
                <div key={k} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[9px] font-black text-emerald-400">{i + 1}</div>
                  <span className="text-[11px] text-slate-300 font-semibold">{k}</span>
                  <span className="ml-auto text-[10px] font-black text-emerald-400">{v}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-[11px] font-black text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertCircle size={12} /> Facteurs moins actifs
            </h4>
            <div className="space-y-2">
              {bottom3.map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                    <Meh size={10} className="text-slate-500" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">{k}</span>
                  <span className="ml-auto text-[10px] font-black text-slate-500">{v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-amber-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-amber-400" /> Analyse psychologique
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Selon la théorie de l'autodétermination (Deci & Ryan), les motivations intrinsèques (plaisir, sens, apprentissage) génèrent un engagement plus durable et une satisfaction plus profonde que les motivations extrinsèques (salaire, statut). Vos principaux moteurs (<strong className="text-amber-300">{top3.map(([k]) => k).join(', ')}</strong>) doivent être présents dans votre futur projet professionnel pour garantir un engagement durable. Un environnement qui ne nourrit pas ces moteurs fondamentaux sera source de désengagement progressif.
          </p>
        </div>
      </div>
    );
  };

  const renderSoftSkillsReport = () => {
    const scores = computeSoftSkills(answers);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4', '#EF4444', '#F97316', '#84CC16', '#A78BFA', '#6366F1', '#14B8A6'];
    const radarData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i % colors.length] }));
    const barData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i % colors.length], maxValue: 10 }));
    const forces = sorted.filter(([, v]) => v >= 7);
    const axes = sorted.filter(([, v]) => v <= 5);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3 text-center">Radar des compétences</h4>
            <RadarChart data={radarData} maxValue={10} />
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3">Scores détaillés</h4>
            <BarChart data={barData} />
          </div>
        </div>

        {forces.length > 0 && (
          <div className="glass-panel rounded-2xl p-5">
            <h4 className="text-xs font-black text-emerald-400 mb-3 flex items-center gap-2">
              <Star size={12} fill="#10B981" /> Vos forces naturelles
            </h4>
            <div className="flex flex-wrap gap-2">
              {forces.map(([k, v]) => (
                <span key={k} className="flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-full font-bold">
                  <Check size={10} /> {k} ({v}/10)
                </span>
              ))}
            </div>
          </div>
        )}

        {axes.length > 0 && (
          <div className="glass-panel rounded-2xl p-5">
            <h4 className="text-xs font-black text-amber-400 mb-3 flex items-center gap-2">
              <Target size={12} /> Axes de développement prioritaires
            </h4>
            <div className="flex flex-wrap gap-2">
              {axes.map(([k, v]) => (
                <span key={k} className="flex items-center gap-1.5 text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-full font-bold">
                  <ArrowRight size={10} /> {k} ({v}/10)
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-emerald-400" /> Analyse psychologique
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Les soft skills sont désormais considérées par les recruteurs comme aussi importantes que les compétences techniques. Selon le World Economic Forum, les 10 compétences les plus recherchées en 2025 sont toutes des soft skills. Vos forces naturelles (<strong className="text-emerald-300">{forces.slice(0, 3).map(([k]) => k).join(', ')}</strong>) constituent un avantage compétitif réel sur le marché du travail. Les axes de développement identifiés peuvent faire l'objet d'un plan de formation ciblé dans le cadre de votre projet professionnel.
          </p>
        </div>
      </div>
    );
  };

  const renderBurnoutReport = () => {
    const scores = computeBurnout(answers);
    const analysis = generateBurnoutAnalysis(scores);
    const gaugeData = [
      { label: 'Épuisement émotionnel', value: scores['Épuisement'], color: '#EF4444' },
      { label: 'Dépersonnalisation', value: scores['Dépersonnalisation'], color: '#F97316' },
      { label: 'Accomplissement', value: scores['Accomplissement'], color: '#10B981' },
    ];

    return (
      <div className="space-y-6">
        <div className={`glass-panel rounded-2xl p-5 border ${
          analysis.niveau === 'élevé' ? 'border-red-500/30 bg-red-500/5' :
          analysis.niveau === 'modéré' ? 'border-amber-500/30 bg-amber-500/5' :
          'border-emerald-500/30 bg-emerald-500/5'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              analysis.niveau === 'élevé' ? 'bg-red-500/20' :
              analysis.niveau === 'modéré' ? 'bg-amber-500/20' :
              'bg-emerald-500/20'
            }`}>
              {analysis.niveau === 'élevé' ? <Frown size={20} className="text-red-400" /> :
               analysis.niveau === 'modéré' ? <Meh size={20} className="text-amber-400" /> :
               <Smile size={20} className="text-emerald-400" />}
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Niveau de risque : <span className={
                analysis.niveau === 'élevé' ? 'text-red-400' :
                analysis.niveau === 'modéré' ? 'text-amber-400' :
                'text-emerald-400'
              }>{analysis.niveau.toUpperCase()}</span></h4>
              <p className="text-[10px] text-slate-400">Basé sur le Maslach Burnout Inventory (MBI)</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">{analysis.message}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {gaugeData.map(d => (
            <div key={d.label} className="glass-panel rounded-2xl p-4 text-center">
              <GaugeChart value={d.value} label={d.label} color={d.color} maxValue={100} />
              <div className="mt-2 text-[10px] text-slate-400 leading-tight">
                {d.label === 'Accomplissement' ? (score: number) => score >= 60 ? 'Satisfaisant' : 'À renforcer' : null}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3">Détail par dimension</h4>
          <BarChart data={gaugeData.map(d => ({ ...d, value: d.value }))} />
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-red-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-red-400" /> Note clinique importante
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Cet outil est un indicateur de dépistage et non un diagnostic clinique. Le burn-out est reconnu par l'OMS comme un phénomène professionnel lié au stress chronique au travail. Il se développe en 3 phases : l'épuisement émotionnel (première dimension touchée), la dépersonnalisation (mécanisme de défense) et la réduction du sentiment d'accomplissement. Si vous présentez des symptômes préoccupants, consultez un professionnel de santé. Ce bilan de compétences peut être le premier pas vers un changement professionnel bénéfique pour votre santé.
          </p>
        </div>
      </div>
    );
  };

  const renderIntelligencesReport = () => {
    const scores = computeIntelligences(answers);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444', '#F97316'];
    const radarData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i] }));
    const barData = sorted.map(([k, v], i) => ({ label: k, value: v, color: colors[i] }));
    const descriptions: Record<string, string> = {
      'Linguistique': 'Sensibilité aux mots, au langage écrit et oral. Métiers : écrivain, journaliste, avocat, enseignant.',
      'Logico-mathématique': 'Pensée logique, abstraite et numérique. Métiers : ingénieur, scientifique, comptable, programmeur.',
      'Spatiale': 'Pensée en images, sens de l\'orientation. Métiers : architecte, designer, chirurgien, pilote.',
      'Kinesthésique': 'Apprentissage par le corps et le mouvement. Métiers : sportif, chirurgien, artisan, danseur.',
      'Musicale': 'Sensibilité aux sons, rythmes et mélodies. Métiers : musicien, compositeur, ingénieur du son.',
      'Interpersonnelle': 'Compréhension des autres, empathie sociale. Métiers : manager, thérapeute, enseignant, commercial.',
      'Intrapersonnelle': 'Connaissance de soi, introspection. Métiers : psychologue, philosophe, entrepreneur, coach.',
      'Naturaliste': 'Sensibilité à la nature et aux êtres vivants. Métiers : biologiste, vétérinaire, agriculteur, écologue.',
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3 text-center">Profil des intelligences</h4>
            <RadarChart data={radarData} maxValue={100} />
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-black text-white mb-3">Scores par type</h4>
            <BarChart data={barData} />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-xs font-black text-white mb-3">Vos intelligences dominantes</h4>
          <div className="space-y-3">
            {sorted.slice(0, 3).map(([k, v], i) => (
              <div key={k} className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: colors[i] }}>{i + 1}</div>
                  <span className="text-xs font-bold text-white">Intelligence {k}</span>
                  <span className="ml-auto text-xs font-black" style={{ color: colors[i] }}>{v}%</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">{descriptions[k]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/10">
          <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
            <Info size={14} className="text-cyan-400" /> Analyse pédagogique
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            La théorie des Intelligences Multiples de Howard Gardner (1983) remet en question la conception traditionnelle d'une intelligence unique mesurée par le QI. Vos intelligences dominantes (<strong className="text-cyan-300">{sorted.slice(0, 3).map(([k]) => k).join(', ')}</strong>) révèlent vos modes d'apprentissage préférentiels et les environnements professionnels dans lesquels vous excellerez naturellement. Cette connaissance est précieuse pour choisir des formations adaptées à votre profil et des méthodes pédagogiques efficaces.
          </p>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    switch (testId) {
      case 'riasec': return renderRIASECReport();
      case 'big5': return renderBig5Report();
      case 'valeurs': return renderValeursReport();
      case 'motivations': return renderMotivationsReport();
      case 'softskills': return renderSoftSkillsReport();
      case 'burnout': return renderBurnoutReport();
      case 'intelligences': return renderIntelligencesReport();
      default: return <p className="text-slate-400">Rapport non disponible.</p>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${test.color} text-white mb-1`}>
            {test.icon} {test.category}
          </div>
          <h1 className="text-lg font-black text-white">Rapport : {test.title}</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500">Généré le</p>
          <p className="text-[11px] font-bold text-slate-300">{new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4 flex items-center gap-3 border border-neon-pink/10">
        <CheckCircle2 size={20} className="text-neon-pink flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-white">Test complété avec succès</p>
          <p className="text-[10px] text-slate-400">{test.questionCount} questions analysées · Rapport généré par EasyBilan</p>
        </div>
      </div>

      {renderReport()}

      <div className="glass-panel rounded-2xl p-5 border border-white/5">
        <p className="text-[10px] text-slate-500 text-center leading-relaxed">
          Ce rapport est généré automatiquement à titre indicatif. Il doit être interprété dans le cadre d'un accompagnement professionnel avec votre consultant en bilan de compétences. EasyBilan · Confidentiel
        </p>
      </div>
    </div>
  );
};

// ─── COMPOSANT QUESTIONNAIRE ──────────────────────────────────────────────────
const TestQuiz: React.FC<{
  test: TestDefinition;
  onComplete: (answers: Answers) => void;
  onBack: () => void;
}> = ({ test, onComplete, onBack }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const question = test.questions[currentQ];
  const progress = ((currentQ) / test.questions.length) * 100;
  const isAnswered = answers[question.id] !== undefined;
  const isLast = currentQ === test.questions.length - 1;

  const handleAnswer = (value: string | number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (isLast) {
      onComplete({ ...answers });
    } else {
      setCurrentQ(prev => prev + 1);
      // Ne pas scroller vers le haut
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(prev => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto" ref={containerRef}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-black text-white">{test.title}</h2>
          <p className="text-[10px] text-slate-500">Question {currentQ + 1} sur {test.questions.length}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500">Progression</p>
          <p className="text-sm font-black text-neon-pink">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-neon-pink rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="glass-panel rounded-2xl p-6 mb-4">
        {question.dimension && (
          <span className="text-[9px] font-black text-neon-pink/70 uppercase tracking-widest mb-2 block">
            {question.dimension}
          </span>
        )}
        <p className="text-sm font-semibold text-white leading-relaxed mb-6">{question.text}</p>

        {/* Options Likert 5 */}
        {question.type === 'likert5' && (
          <div className="space-y-2">
            {LIKERT5_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  answers[question.id] === opt.value
                    ? 'bg-neon-pink/20 border border-neon-pink/40 text-white'
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  answers[question.id] === opt.value ? 'border-neon-pink bg-neon-pink' : 'border-slate-600'
                }`}>
                  {answers[question.id] === opt.value && <Check size={10} className="text-white" />}
                </div>
                <span className="text-[11px] font-semibold">{opt.label}</span>
                <span className="ml-auto text-[10px] text-slate-500 font-black">{opt.value}/5</span>
              </button>
            ))}
          </div>
        )}

        {/* Échelle 1-10 */}
        {question.type === 'scale10' && (
          <div>
            <div className="flex justify-between text-[9px] text-slate-500 mb-2">
              <span>Pas important</span>
              <span>Très important</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                <button
                  key={v}
                  onClick={() => handleAnswer(v)}
                  className={`h-10 rounded-xl text-[11px] font-black transition-all ${
                    answers[question.id] === v
                      ? 'bg-neon-pink text-white shadow-neon-pink'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            {answers[question.id] && (
              <p className="text-center text-[11px] text-neon-pink font-bold mt-3">
                Valeur sélectionnée : {answers[question.id]}/10
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 text-[11px] font-bold disabled:opacity-30 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={14} /> Précédent
        </button>

        <div className="flex gap-1">
          {test.questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentQ ? 'w-4 bg-neon-pink' :
                answers[test.questions[i].id] !== undefined ? 'w-1.5 bg-neon-pink/40' :
                'w-1.5 bg-white/10'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
            isAnswered
              ? isLast
                ? 'bg-primary-gradient text-white shadow-neon-pink'
                : 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30 hover:bg-neon-pink/30'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isLast ? (
            <><BarChart2 size={14} /> Voir mon rapport</>
          ) : (
            <>Suivant <ArrowRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── PAGE PRINCIPALE TESTS ─────────────────────────────────────────────────────
const Tests: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testPhase, setTestPhase] = useState<'list' | 'quiz' | 'report'>('list');
  const [completedTests, setCompletedTests] = useState<TestResults>({});
  const [currentAnswers, setCurrentAnswers] = useState<Answers>({});

  const handleStartTest = (testId: string) => {
    setActiveTest(testId);
    setTestPhase('quiz');
  };

  const handleCompleteTest = (answers: Answers) => {
    setCurrentAnswers(answers);
    setCompletedTests(prev => ({ ...prev, [activeTest!]: answers }));
    setTestPhase('report');
  };

  const handleBackToList = () => {
    setActiveTest(null);
    setTestPhase('list');
    setCurrentAnswers({});
  };

  const handleBackToQuiz = () => {
    setTestPhase('quiz');
  };

  const handleViewReport = (testId: string) => {
    setActiveTest(testId);
    setCurrentAnswers(completedTests[testId]);
    setTestPhase('report');
  };

  if (testPhase === 'quiz' && activeTest) {
    const test = TESTS.find(t => t.id === activeTest)!;
    return (
      <TestQuiz
        test={test}
        onComplete={handleCompleteTest}
        onBack={handleBackToList}
      />
    );
  }

  if (testPhase === 'report' && activeTest) {
    return (
      <TestReport
        testId={activeTest}
        answers={currentAnswers}
        onBack={handleBackToList}
      />
    );
  }

  // Liste des tests
  const completedCount = Object.keys(completedTests).length;
  const totalCount = TESTS.length;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Tests & Évaluations
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Découvrez votre profil professionnel grâce à des tests validés scientifiquement, utilisés par les psychologues du travail.
        </p>
      </div>

      {/* Progression globale */}
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-black text-white">Progression du bilan</h3>
            <p className="text-[11px] text-slate-400">{completedCount} test{completedCount > 1 ? 's' : ''} complété{completedCount > 1 ? 's' : ''} sur {totalCount}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-neon-pink">{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-gradient rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        <div className="flex gap-1 mt-3">
          {TESTS.map(t => (
            <div
              key={t.id}
              className={`flex-1 h-1 rounded-full transition-all ${completedTests[t.id] ? 'bg-neon-pink' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      {/* Grille des tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TESTS.map((test, i) => {
          const isCompleted = !!completedTests[test.id];
          return (
            <div
              key={test.id}
              className={`glass-panel rounded-2xl p-5 border transition-all ${
                isCompleted ? 'border-neon-pink/20' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center text-white shadow-lg`}>
                  {test.icon}
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-neon-pink bg-neon-pink/10 border border-neon-pink/20 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={8} /> Complété
                    </span>
                  )}
                  <span className="text-[9px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full font-semibold">{test.category}</span>
                </div>
              </div>

              <h3 className="text-sm font-black text-white mb-0.5">{test.title}</h3>
              <p className="text-[10px] text-neon-pink font-bold mb-2">{test.subtitle}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4 line-clamp-2">{test.description}</p>

              <div className="flex items-center gap-3 mb-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Clock size={10} /> {test.duration}</span>
                <span className="flex items-center gap-1"><FileText size={10} /> {test.questionCount} questions</span>
              </div>

              <div className="flex gap-2">
                {isCompleted ? (
                  <>
                    <button
                      onClick={() => handleViewReport(test.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neon-pink/10 text-neon-pink border border-neon-pink/20 text-[11px] font-bold hover:bg-neon-pink/20 transition-all"
                    >
                      <BarChart2 size={12} /> Voir le rapport
                    </button>
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-all"
                      title="Refaire le test"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStartTest(test.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary-gradient text-white text-[11px] font-bold shadow-neon-pink hover:opacity-90 transition-all"
                  >
                    <Play size={12} /> Commencer le test
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bannière synthèse */}
      {completedCount >= 3 && (
        <div className="glass-panel rounded-2xl p-5 border border-neon-pink/20 bg-neon-pink/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-pink/20 flex items-center justify-center">
              <Star size={20} className="text-neon-pink" fill="#EC4899" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Bonne progression !</h4>
              <p className="text-[11px] text-slate-400">
                Vous avez complété {completedCount} tests. Partagez vos rapports avec votre consultant pour une analyse approfondie de votre profil.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Note méthodologique */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5">
        <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2">
          <Info size={14} className="text-slate-400" /> Note méthodologique
        </h4>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Les tests proposés s'appuient sur des modèles validés scientifiquement (RIASEC/Holland, Big Five/OCEAN, MBI/Maslach, Intelligences Multiples/Gardner, Théorie de l'autodétermination/Deci & Ryan). Ils sont utilisés à titre indicatif et doivent être interprétés dans le cadre d'un accompagnement professionnel. EasyBilan · Confidentiel
        </p>
      </div>
    </div>
  );
};

export default Tests;

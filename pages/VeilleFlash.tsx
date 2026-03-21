import React, { useState } from 'react';
import {
  Scale,
  Briefcase,
  Lightbulb,
  Heart,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  Sparkles,
  BookOpen,
  TrendingUp,
  Brain,
  Accessibility
} from 'lucide-react';

interface Article {
  id: number;
  title: string;
  source: string;
  url: string;
  summary: string;
  tags: string[];
  importance: 'Critique' | 'Majeur' | 'Mineur';
}

interface Section {
  id: string;
  indicateur: string;
  titre: string;
  icon: React.ReactNode;
  color: string;
  articles: Article[];
}

const VEILLE_DATE = '21 mars 2026';

const SECTIONS: Section[] = [
  {
    id: 'ind23',
    indicateur: 'Indicateur 23',
    titre: 'Veille Légale & Réglementaire',
    icon: <Scale size={20} />,
    color: 'from-violet-600 to-purple-700',
    articles: [
      {
        id: 1,
        title: 'Accident du travail et apprentissage : la protection du salarié prime sur la rupture « libre » des 45 jours',
        source: 'Centre Inffo',
        url: 'https://www.centre-inffo.fr/site-droit-formation/actualites-droit/accident-du-travail-et-apprentissage-la-protection-du-salarie-prime-sur-la-rupture-libre-des-45-jours',
        summary: 'La Cour d\'appel de Bordeaux rappelle que le régime spécifique de l\'apprentissage ne neutralise pas les règles protectrices liées aux accidents du travail. Même pendant les 45 premiers jours, un employeur ne peut rompre le contrat d\'un apprenti en arrêt suite à un accident du travail, sauf faute grave.',
        tags: ['Apprentissage', 'Jurisprudence', 'CFA', 'Contrat'],
        importance: 'Critique'
      },
      {
        id: 2,
        title: 'CPF 2026 : budget en baisse et nouvelles restrictions sur le financement du permis de conduire',
        source: 'Training Orchestra',
        url: 'https://trainingorchestra.com/fr/le-marche-de-la-formation-professionnelle-en-france/',
        summary: 'Le budget France Compétences dédié au CPF passe à 1,31 Md€ (contre 1,96 Md€ en 2025). Le financement du permis est désormais restreint aux demandeurs d\'emploi ou salariés avec cofinancement. Une hausse du reste à charge est attendue pour les usagers.',
        tags: ['CPF', 'Financement', 'Loi de finances 2026', 'France Compétences'],
        importance: 'Critique'
      }
    ]
  },
  {
    id: 'ind24',
    indicateur: 'Indicateur 24',
    titre: 'Veille Emplois & Métiers',
    icon: <Briefcase size={20} />,
    color: 'from-pink-600 to-rose-700',
    articles: [
      {
        id: 3,
        title: 'RUF 2025 : plus d\'un actif sur dix a bénéficié du Conseil en Évolution Professionnelle',
        source: 'Cap Métiers Nouvelle-Aquitaine',
        url: 'https://pro.cap-metiers.fr/actualite/ruf-2025-zoom-sur-le-conseil-en-evolution-professionnelle',
        summary: 'France Compétences publie son rapport sur l\'usage des fonds. Le CEP a touché 3,37 millions de personnes en 2024. Le rapport insiste sur son rôle de levier de sécurisation des parcours et de développement de l\'autonomie, au-delà du simple retour à l\'emploi.',
        tags: ['CEP', 'Reconversion', 'France Compétences', 'RUF 2025'],
        importance: 'Majeur'
      },
      {
        id: 4,
        title: 'L\'Afpa ouvre ses portes en Bourgogne-Franche-Comté : 73 % d\'insertion dans les 6 mois',
        source: 'Dijon Actualités',
        url: 'https://dijon-actualites.fr/2026/03/21/lafpa-ouvre-ses-portes-en-bourgogne-franche-comte-une-opportunite-pour-construire-son-avenir-professionnel/',
        summary: 'Journée Portes Ouvertes Afpa le 26 mars 2026 dans 7 centres de la région. Focus sur les métiers en tension (BTP, industrie, services), l\'alternance et l\'accompagnement CPF. Taux d\'insertion de 73 % dans les 6 mois post-formation.',
        tags: ['Afpa', 'Alternance', 'Reconversion', 'CPF', 'Métiers en tension'],
        importance: 'Mineur'
      }
    ]
  },
  {
    id: 'ind25',
    indicateur: 'Indicateur 25',
    titre: 'Veille Pédagogique & Technologique',
    icon: <Lightbulb size={20} />,
    color: 'from-fuchsia-600 to-purple-800',
    articles: [
      {
        id: 5,
        title: 'L\'IA à l\'école et en formation : un virage obligé pour ne pas former des diplômés « obsolètes »',
        source: 'École branchée – Ludoviales 2026',
        url: 'https://ecolebranchee.com/ia-virage-oblige-pour-ne-pas-former-des-diplomes-obsoletes/',
        summary: 'Les Ludoviales 2026 confirment que l\'IA est un levier pédagogique incontournable. Elle transforme le rôle du formateur d\'expert vers celui de coach. Créer des évaluations, différencier les parcours, produire des supports : l\'IA devient un co-formateur.',
        tags: ['Intelligence Artificielle', 'Pédagogie', 'Digital Learning', 'Innovation'],
        importance: 'Majeur'
      },
      {
        id: 6,
        title: 'DPC 2026 : 27 axes de compétences prioritaires pour la fonction publique hospitalière',
        source: 'Fédération Hospitalière de France (FHF)',
        url: 'https://www.fhf.fr/expertises/ressources-humaines/developpement-des-competences-formation-etudiants-en-sante/dpc-27-axes-de-competences-prioritaires-proposes-dans-une-note-dinformation-dgos',
        summary: 'La note DGOS du 6 mars 2026 fixe 27 axes de formation prioritaires pour le DPC 2026, dont 8 thèmes nouveaux. Ces orientations soutiennent les politiques sanitaires et médico-sociales nationales. Référence incontournable pour les OF du secteur santé.',
        tags: ['DPC', 'Santé', 'Compétences prioritaires', 'Fonction publique'],
        importance: 'Majeur'
      }
    ]
  },
  {
    id: 'ind26',
    indicateur: 'Indicateur 26',
    titre: 'Accessibilité & Handicap',
    icon: <Heart size={20} />,
    color: 'from-violet-500 to-pink-600',
    articles: [
      {
        id: 7,
        title: 'Journée mondiale de la trisomie 21 : enjeux d\'accompagnement vers l\'emploi et la formation',
        source: 'handicap.gouv.fr – Ministère de la Santé',
        url: 'https://www.handicap.gouv.fr/journee-mondiale-de-la-trisomie-21',
        summary: 'Ce 21 mars, le gouvernement rappelle l\'importance d\'accompagnements adaptés tout au long de la vie. Le dispositif d\'emploi accompagné sécurise les parcours professionnels en milieu ordinaire. Un appel à la coordination entre acteurs de la santé, de l\'éducation et de l\'emploi.',
        tags: ['Trisomie 21', 'Handicap', 'Emploi accompagné', 'Inclusion'],
        importance: 'Majeur'
      },
      {
        id: 8,
        title: 'FIPHFP : formation « Devenir fresqueur de la fresque emploi et handicap » dans les Hauts-de-France',
        source: 'FIPHFP',
        url: 'https://www.fiphfp.fr/actualites-et-evenements/actualites/hauts-de-france-formation-devenirs-fresqueurs-de-la-fresque-emploi-et-handicap',
        summary: '20 référents handicap de la Fonction publique formés à l\'animation de la "Fresque Handicap en emploi". Cet outil collaboratif et ludique, co-créé avec l\'Agefiph, vise à sensibiliser au handicap au travail. Un modèle à dupliquer dans vos structures.',
        tags: ['FIPHFP', 'Agefiph', 'Sensibilisation', 'Référent handicap', 'Inclusion'],
        importance: 'Majeur'
      }
    ]
  }
];

const importanceColors: Record<string, string> = {
  Critique: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Majeur: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  Mineur: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
};

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-panel rounded-xl p-4 hover:border-white/15 transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${importanceColors[article.importance]}`}>
              {article.importance}
            </span>
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-start gap-2 hover:text-neon-pink transition-colors"
          >
            <span className="text-[13px] font-semibold text-slate-200 leading-snug group-hover/link:text-neon-pink transition-colors">
              {article.title}
            </span>
            <ExternalLink size={13} className="text-slate-500 group-hover/link:text-neon-pink transition-colors mt-0.5 shrink-0" />
          </a>
          <p className="text-[10px] text-neon-pink font-semibold mt-1 uppercase tracking-wider">
            — {article.source}
          </p>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? 'Masquer le résumé' : 'Voir le résumé'}
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[11px] text-slate-400 leading-relaxed">{article.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.map(tag => (
              <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-neon-pink/10 text-neon-pink border border-neon-pink/20">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionCard: React.FC<{ section: Section }> = ({ section }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-neon-pink`}>
            {section.icon}
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">{section.indicateur}</p>
            <h2 className="text-[15px] font-bold text-white">{section.titre}</h2>
          </div>
          <span className="ml-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-neon-pink/10 text-neon-pink border border-neon-pink/20">
            {section.articles.length} articles
          </span>
        </div>
        <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div className="space-y-3 pl-0">
          {section.articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

const VeilleFlash: React.FC = () => {
  const totalArticles = SECTIONS.reduce((acc, s) => acc + s.articles.length, 0);
  const critiques = SECTIONS.flatMap(s => s.articles).filter(a => a.importance === 'Critique').length;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-gradient opacity-5 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-neon-pink/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center shadow-neon-pink">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="text-[11px] font-black text-neon-pink uppercase tracking-[0.2em]">EasyQuali — Veille Flash</span>
          </div>

          <h1 className="text-2xl font-black text-white mb-1 leading-tight">
            Veille Formation Professionnelle
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} className="text-neon-pink" />
            <span className="text-[13px] font-bold text-neon-pink">{VEILLE_DATE}</span>
            <span className="text-slate-500 text-[11px]">— Édition quotidienne Qualiopi</span>
          </div>

          <p className="text-[12px] text-slate-400 leading-relaxed max-w-2xl">
            Votre veille réglementaire, pédagogique et technologique couvrant les 4 indicateurs Qualiopi (23, 24, 25, 26) 
            pour les CFA, organismes de formation, bilans de compétences et VAE. Sources françaises officielles uniquement.
          </p>

          <div className="flex items-center gap-4 mt-5 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <BookOpen size={12} className="text-neon-pink" />
              <span className="text-[11px] font-bold text-slate-300">{totalArticles} articles</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <TrendingUp size={12} className="text-red-400" />
              <span className="text-[11px] font-bold text-red-400">{critiques} alertes critiques</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <Brain size={12} className="text-violet-400" />
              <span className="text-[11px] font-bold text-slate-300">4 indicateurs couverts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé exécutif */}
      <div className="glass-panel rounded-xl p-4 mb-8 border-l-2 border-neon-pink">
        <p className="text-[10px] font-black text-neon-pink uppercase tracking-[0.15em] mb-2">Résumé exécutif du jour</p>
        <p className="text-[12px] text-slate-300 leading-relaxed">
          <strong className="text-white">Veille flash du 21 mars 2026 :</strong> jurisprudence apprentissage accident du travail, 
          nouvelles restrictions CPF loi de finances 2026, IA comme levier pédagogique incontournable, 
          Journée mondiale trisomie 21 et inclusion professionnelle.
        </p>
      </div>

      {/* Sections */}
      {SECTIONS.map(section => (
        <SectionCard key={section.id} section={section} />
      ))}

      {/* Footer */}
      <div className="glass-panel rounded-xl p-4 mt-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Accessibility size={14} className="text-neon-pink" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Conformité Qualiopi</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Cette veille couvre les Indicateurs 23, 24, 25 et 26 du référentiel Qualiopi. 
          Sources françaises officielles uniquement. Périmètre : formation professionnelle pour adultes (CFA, OF, Bilan de compétences, VAE).
        </p>
        <p className="text-[10px] text-slate-600 mt-2">
          Générée par EasyQuali IA — {VEILLE_DATE} — Karine Bertin
        </p>
      </div>
    </div>
  );
};

export default VeilleFlash;

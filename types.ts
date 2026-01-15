
export type UserRole = 'admin' | 'formateur' | 'student';
export type AppViewMode = 'admin' | 'student';
export type SessionStatus = 'draft' | 'active' | 'completed';
export type DocumentType = 'convention' | 'attestation' | 'convocations' | 'evaluation' | 'satisfaction';
export type DocumentStatus = 'draft' | 'sent' | 'opened' | 'signed' | 'refused' | 'missing';

export interface SubSequenceAsset {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
}

export interface SubSequence {
  id: string;
  name: string;
  description: string; // Narration / Script
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'interactive'; // Legacy
  
  // Ordre des blocs sur la page
  blockOrder?: string[];

  // Blocs activables
  mediaType?: 'video' | 'image' | 'none';
  mediaUrl?: string;

  showPodcast?: boolean;
  podcastUrl?: string;
  podcastTitle?: string;

  showFlashCards?: boolean;
  flashCards?: FlashCard[];

  showCheatSheet?: boolean; 
  cheatSheetTitle?: string;
  cheatSheetContent?: string;

  showNeuroInsight?: boolean;
  neuroInsightContent?: string;
  
  showQuickQuiz?: boolean;
  quickQuizTitle?: string;
  quickQuizQuestions?: string[];
  
  assets?: SubSequenceAsset[];
}

export interface Sequence {
  id: string;
  name: string;
  description: string;
  duration: string;
  subSequences: SubSequence[];
}

export interface ProgramModule {
  id: string;
  name: string;
  duration: string;
  description: string;
  sequences: Sequence[];
  methods?: string[];
  bloomLevel: string;
  competencyRef?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  duration: string;
  price: number;
  level: 'Débutant' | 'Intermédiaire' | 'Expert';
  targetAudience: string;
  objectives: string[];
  prerequisites: string;
  accessDelay: string;
  accessibility: string;
  evaluationMethods: string;
  modules: ProgramModule[];
  coverImage?: string;
  rs_rncp_code?: string;
  isCpfEligible: boolean;
  satisfactionRate: number;
  completionRate: number;
  version: string;
}

export interface DocumentTracking { id: string; type: DocumentType; status: DocumentStatus; sentAt?: string; openedAt?: string; signedAt?: string; downloadUrl?: string; }
export interface Student { id: string; name: string; email: string; company: string; attendanceStatus: 'present' | 'absent' | 'justified' | 'pending'; signatureStatus: DocumentStatus; documents: DocumentTracking[]; }
export interface TrainingSession { id: string; title: string; trainer: string; startDate: string; endDate: string; status: SessionStatus; students: Student[]; totalPrice: number; locationType: 'presentiel' | 'distanciel' | 'hybride'; }
export interface Trainer { id: string; name: string; email: string; phone: string; specialization: string[]; type: 'salarié' | 'indépendant'; status: 'actif' | 'inactif'; siret?: string; nda?: string; rating: number; tjm: number; cv_last_update: string; is_qualiopi_compliant: boolean; active_sessions: number; }
export interface Client { id: string; name: string; type: 'Entreprise' | 'Particulier' | 'Financeur'; email: string; phone: string; address: string; status: 'Actif' | 'Prospect'; initials: string; color: string; contactPerson?: string; revenue: number; debt: number; health: number; }
export interface Financeur { id: string; name: string; totalFunded: number; activeFiles: number; logoColor: string; type: 'OPCO' | 'Public' | 'Autre'; }
export interface ApprenantCRM { id: string; name: string; email: string; trainingsFollowed: number; lastTrainingDate: string; totalSpent: number; status: 'active' | 'graduated' | 'stopped'; }
export interface AIWatchEntry { id: string; date: string; source: string; title: string; summary: string; impact_description: string; recommended_action: string; category: 'legal' | 'pedagogical' | 'handicap' | 'business'; impact_score: number; relevant_indicators: number[]; status: 'new' | 'processed' | 'archived'; impacted_templates?: string[]; }
export interface KPIData { label: string; value: string; trend: number; icon: any; color: string; }
export interface RegulatoryAlert { id: string; date: string; title: string; severity: 'low' | 'medium' | 'high'; description: string; action_type?: 'update_template' | 'info'; }
export interface LearningResource { id: string; title: string; type: 'pdf' | 'video' | 'quiz' | 'template'; size?: string; duration?: string; addedAt: string; isAiVerified?: boolean; lastAiUpdate?: string; }
export interface Quiz { id: string; title: string; questions: { id: number; question: string; options: string[]; correctAnswer: number; explanation: string; }[]; }
export interface QualiopiIndicator { id: number; criterion: number; label: string; status: 'validated' | 'pending' | 'none'; evidence_count: number; }
export interface QualityRisk { id: string; level: 'major' | 'minor'; indicator: number; message: string; session_id: string; }
export interface Invoice { id: string; client: string; amount: number; status: 'paid' | 'pending' | 'overdue' | 'dunning_1' | 'legal_notice'; dueDate: string; viewedByClient: boolean; autoSendEnabled: boolean; lastReminderSent?: string; vatRate: number; sessionTitle: string; }
export interface BankTransaction { id: string; date: string; label: string; amount: number; type: 'credit' | 'debit'; isMatched: boolean; suggestedInvoiceId?: string; }
export interface InvoiceSchedule { id: string; label: string; percentage: number; amount: number; status: 'paid' | 'pending'; type: 'upfront' | 'final'; triggerDate?: string; }
export interface BPFData { year: number; totalTrainees: number; totalHours: number; revenueByOrigin: { opco: number; cpf: number; companies: number; individuals: number; state: number; }; traineesByCategory: { employees: number; jobSeekers: number; others: number; }; lastConsolidated: string; }
export interface Lead { id: string; name: string; email: string; phone?: string; training_interest: string; status: 'new' | 'contacted' | 'qualified' | 'registered' | 'lost'; score: number; date: string; automation_active?: boolean; notes?: string; }

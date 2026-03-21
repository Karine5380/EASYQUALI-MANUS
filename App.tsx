
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  Wallet, 
  Sparkles,
  Bell,
  Search,
  Command,
  Monitor,
  User,
  Zap,
  PlayCircle,
  Mail,
  FileBox,
  TrendingUp,
  ChevronDown,
  Star,
  RefreshCw,
  Activity,
  Bot,
  ShoppingBag,
  UserCircle,
  Globe,
  Settings,
  ArrowLeft,
  LogOut,
  LayoutTemplate,
  ClipboardList,
  Library
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs'; 
import LearningSpace from './pages/LearningSpace';
import CRM from './pages/CRM';
import Qualiopi from './pages/Qualiopi';
import QualityDashboard from './pages/QualityDashboard'; 
import AuditorBot from './pages/AuditorBot';
import Finances from './pages/Finances';
import Sessions from './pages/Sessions';
import SessionDetail from './pages/SessionDetail';
import Library from './pages/Library';
import EmailLibrary from './pages/EmailLibrary';
import QualityWatcher from './pages/QualityWatcher';
import SigningPortal from './pages/SigningPortal';
import Clients from './pages/Clients';
import Trainers from './pages/Trainers';
import TrainerDetail from './pages/TrainerDetail';
import Notifications from './pages/Notifications';
import AdminLibrary from './pages/AdminLibrary';
import ElearningStudio from './pages/ElearningStudio';
import PublicCatalogue from './pages/PublicCatalogue';
import PublicTrainingDetail from './pages/PublicTrainingDetail';
import PublicRegistration from './pages/PublicRegistration';
import StudentPortal from './pages/StudentPortal';
import Tests from './pages/Tests';
import Ressources from './pages/Ressources';
import VeilleFlash from './pages/VeilleFlash';
import SettingsPage from './pages/Settings';
import LandingPage from './pages/Landing';
import BlogPage from './pages/Blog';
import CommandBar from './components/CommandBar';
import { AppViewMode } from './types';

const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6 mb-3">
    <div className="flex items-center justify-between px-4 mb-1.5">
      <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">{title}</h3>
      <ChevronDown size={10} className="text-slate-600" />
    </div>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

const SidebarItem: React.FC<{ 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  isNew?: boolean;
  variant?: 'normal' | 'super';
}> = ({ to, icon, label, active, isNew, variant = 'normal' }) => (
  <Link
    to={to}
    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-200 relative group ${
      active 
        ? variant === 'super' ? 'bg-neon-pink/10 text-white font-black' : 'bg-neon-pink/10 text-neon-pink font-semibold' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`}
  >
    <span className={`${active ? variant === 'super' ? 'text-neon-pink' : 'text-neon-pink' : 'text-slate-500 group-hover:text-slate-300'}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
    </span>
    <span className="text-[12px]">{label}</span>
    {active && (
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 ${variant === 'super' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-neon-pink rounded-l-full shadow-neon-pink'}`}></div>
    )}
  </Link>
);

const Sidebar = ({ viewMode, onToggleView, isSuperAdmin }: { viewMode: string, onToggleView: () => void, isSuperAdmin: boolean }) => {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/5 flex flex-col z-50 overflow-y-auto scrollbar-hide">
      <div className="p-5">
        <Link to="/landing" className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-lg bg-primary-gradient flex items-center justify-center shadow-neon-pink">
            <Sparkles className="text-white w-4 h-4" />
          </div>
            <span className="text-base font-bold bg-clip-text text-transparent bg-primary-gradient tracking-tight italic">
            EasyBilan
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-2.5">
        {isSuperAdmin && viewMode === 'super' ? (
          <>
            <SidebarSection title="SUPER ADMIN (GOD MODE)">
               <SidebarItem to="/landing" icon={<LayoutTemplate />} label="Landing Page" active={location.pathname === '/landing' || location.pathname === '/'} variant="super" />
               <SidebarItem to="/admin/library" icon={<Globe />} label="Master Library" active={location.pathname === '/admin/library'} variant="super" />
               <SidebarItem to="/admin/stats" icon={<TrendingUp />} label="Global Insights" active={location.pathname === '/admin/stats'} variant="super" />
               <SidebarItem to="/admin/tenants" icon={<Users />} label="Gestion Clients" active={location.pathname === '/admin/tenants'} variant="super" />
            </SidebarSection>
          </>
        ) : viewMode === 'admin' ? (
          <>
            <SidebarSection title="NAVIGATION">
              <SidebarItem to="/dashboard" icon={<LayoutDashboard />} label="Tableau de bord" active={location.pathname === '/dashboard'} />
              <SidebarItem to="/notifications" icon={<Bell />} label="Action Center" active={location.pathname === '/notifications'} isNew />
              <SidebarItem to="/clients" icon={<Users />} label="Clients et financeurs" active={location.pathname === '/clients'} />
              <SidebarItem to="/crm" icon={<Users />} label="CRM & Leads" active={location.pathname === '/crm'} />
              <SidebarItem to="/trainers" icon={<UserCircle />} label="Formateurs" active={location.pathname.startsWith('/trainers')} />
              <SidebarItem to="/sessions" icon={<Calendar />} label="Mes Sessions" active={location.pathname.startsWith('/sessions')} />
            </SidebarSection>

            <SidebarSection title="STUDIO CRÉATION">
              <SidebarItem to="/studio/elearning" icon={<Monitor />} label="Studio E-Learning" active={location.pathname.startsWith('/studio/elearning')} />
              <SidebarItem to="/programs" icon={<BookOpen />} label="Programmes Pédago" active={location.pathname === '/programs'} />
              <SidebarItem to="/library" icon={<FileBox />} label="Modèles Documents" active={location.pathname === '/library'} />
              <SidebarItem to="/emails" icon={<Mail />} label="Email Studio" active={location.pathname === '/emails'} />
              <SidebarItem to="/catalogue" icon={<ShoppingBag />} label="Mon Catalogue Public" active={location.pathname.startsWith('/catalogue')} />
            </SidebarSection>

            <SidebarSection title="QUALITÉ">
              <SidebarItem to="/watcher" icon={<Sparkles />} label="Veille Automatique IA" active={location.pathname === '/watcher'} isNew />
              <SidebarItem to="/veille" icon={<Activity />} label="Veille Flash du Jour" active={location.pathname.startsWith('/veille')} isNew />
              <SidebarItem to="/quality/dashboard" icon={<Activity />} label="Compliance Center" active={location.pathname === '/quality/dashboard'} />
              <SidebarItem to="/quality/auditor" icon={<Bot />} label="Sir Auditor (Examen)" active={location.pathname === '/quality/auditor'} />
              <SidebarItem to="/qualite" icon={<ShieldCheck />} label="Conformité Qualiopi" active={location.pathname === '/qualite'} />
            </SidebarSection>

            <SidebarSection title="CONFIGURATION">
              <SidebarItem to="/finances" icon={<Wallet />} label="Facturation" active={location.pathname === '/finances'} />
              <SidebarItem to="/settings" icon={<Settings />} label="Paramètres Système" active={location.pathname === '/settings'} />
            </SidebarSection>
          </>
        ) : (
          <>
            <SidebarSection title="MON ESPACE">
              <SidebarItem to="/student-portal" icon={<LayoutDashboard />} label="Mon Portail" active={location.pathname === '/student-portal'} />
              <SidebarItem to="/learn/session-demo" icon={<PlayCircle />} label="E-Learning" active={location.pathname.startsWith('/learn/')} />
              <SidebarItem to="/library" icon={<FileBox />} label="Mes Documents" active={location.pathname === '/library'} />
            </SidebarSection>
            <SidebarSection title="BILAN DE COMPÉTENCES">
              <SidebarItem to="/tests" icon={<ClipboardList />} label="Tests & Évaluations" active={location.pathname === '/tests'} isNew />
              <SidebarItem to="/ressources" icon={<Library />} label="Centre de Ressources" active={location.pathname === '/ressources'} />
            </SidebarSection>
          </>
        )}
      </nav>

      <div className="p-3 mt-auto border-t border-white/5 space-y-3">
        {isSuperAdmin && (
          <button 
            onClick={onToggleView}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'super' ? 'bg-primary-gradient text-white shadow-neon-pink' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/50'}`}
          >
            <Star size={12} fill={viewMode === 'super' ? 'white' : 'none'} />
            {viewMode === 'super' ? 'Quitter Mode Master' : 'Passer Mode Master'}
          </button>
        )}
        
        {viewMode !== 'super' && (
          <button 
            onClick={onToggleView}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/40 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-700/50 transition-all"
          >
            <RefreshCw size={12} />
            Switcher : {viewMode === 'admin' ? 'Client' : 'Admin'}
          </button>
        )}

        <div className="flex items-center gap-2.5 p-1.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center text-white font-bold text-sm shadow-neon-pink/20">
            K
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[12px] font-bold text-white truncate">Karine Bertin</p>
            <p className="text-[8px] font-black text-neon-pink uppercase tracking-tighter">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
          </div>
          <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
             <ShieldCheck size={12} />
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-14 flex items-center justify-between px-6 sticky top-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-xl w-72 border border-white/5">
        <Search className="text-slate-500" size={14} />
        <span className="text-[11px] text-slate-500">Rechercher...</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Link to="/notifications" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-[0_0_8px_#FF00FF] animate-pulse"></span>
        </Link>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-gradient text-white text-[11px] font-bold shadow-neon-pink">
          <Zap size={12} /> IA Lab
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [viewMode, setViewMode] = useState<AppViewMode | 'super'>('admin');
  const isSuperAdmin = true;

  const toggleView = () => {
    if (viewMode === 'admin') setViewMode('student');
    else if (viewMode === 'student') setViewMode('admin');
    else setViewMode('admin');
  };

  const toggleSuperMode = () => {
    setViewMode(prev => prev === 'super' ? 'admin' : 'super');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar présente sur toutes les pages sans modification de contenu */}
      <Sidebar 
        viewMode={viewMode} 
        onToggleView={viewMode === 'super' ? toggleSuperMode : toggleView} 
        isSuperAdmin={isSuperAdmin} 
      />
      
      <main className="flex-1 min-h-screen bg-[#020617] text-slate-100 transition-all ml-64">
        <Header />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/dashboard" element={<Dashboard viewMode={viewMode === 'super' ? 'admin' : (viewMode as any)} />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainers/:trainerId" element={<TrainerDetail />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:sessionId" element={<SessionDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/library" element={<Library />} />
            <Route path="/emails" element={<EmailLibrary />} />
            <Route path="/watcher" element={<QualityWatcher />} />
            <Route path="/qualite" element={<Qualiopi />} />
            <Route path="/quality/dashboard" element={<QualityDashboard />} />
            <Route path="/quality/auditor" element={<AuditorBot />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/studio/elearning/:programId?" element={<ElearningStudio />} />
            <Route path="/learn/:sessionId" element={<LearningSpace />} />
            <Route path="/signing-portal/:docId" element={<SigningPortal />} />
            <Route path="/admin/library" element={<AdminLibrary />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/catalogue" element={<PublicCatalogue />} />
            <Route path="/catalogue/formation/:id" element={<PublicTrainingDetail />} />
            <Route path="/catalogue/inscription/:id" element={<PublicRegistration />} />
            <Route path="/tests" element={<Tests />} />
              <Route path="/ressources" element={<Ressources />} />
              <Route path="/veille" element={<VeilleFlash />} />
              <Route path="/veille/:date" element={<VeilleFlash />} />
          </Routes>
        </div>
      </main>
      <CommandBar isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onToggleView={toggleView} />
    </div>
  );
};

export default App;

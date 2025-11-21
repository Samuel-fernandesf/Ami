import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TaskList } from './components/TaskList';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { CreateTaskModal } from './components/CreateTaskModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AmiLogo } from './components/AmiLogo';
import { LogoShowcase } from './components/LogoShowcase';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Certificates } from './components/Certificates';
import { UserProfile } from './components/UserProfile';
import { ForOrganizations } from './components/ForOrganizations';
import { About } from './components/About';
import { Messages } from './components/Messages';
import { User } from './types';

type ViewType = 'home' | 'tasks' | 'dashboard' | 'profile' | 'about' | 'for-orgs' | 'brand' | 'notifications' | 'settings' | 'certificates' | 'messages';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleTaskCreated = () => {
    // In real app, refresh tasks data
    console.log('Task created successfully');
  };

  const handleProtectedNavigation = (view: ViewType, requireLogin: boolean = true) => {
    if (requireLogin && !currentUser) {
      setShowAuthModal(true);
      return;
    }
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-brasil-green/5">
      <Header 
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection 
              onFindOpportunities={() => handleNavigate('tasks')}
              onForOrgs={() => handleNavigate('for-orgs')}
            />
          </motion.div>
        )}

        {currentView === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TaskList />
          </motion.div>
        )}

        {currentView === 'dashboard' && currentUser && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard user={currentUser} onCreateTask={handleCreateTask} />
          </motion.div>
        )}

        {currentView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <About onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'for-orgs' && (
          <motion.div
            key="for-orgs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ForOrganizations onLogin={handleLogin} />
          </motion.div>
        )}

        {currentView === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Notifications />
          </motion.div>
        )}

        {currentView === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Settings />
          </motion.div>
        )}

        {currentView === 'certificates' && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Certificates />
          </motion.div>
        )}

        {currentView === 'brand' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LogoShowcase />
          </motion.div>
        )}

        {currentView === 'profile' && currentUser && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UserProfile user={currentUser} onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'messages' && currentUser && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Messages />
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <CreateTaskModal 
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onTaskCreated={handleTaskCreated}
      />

      {/* Floating Action Button */}
      {currentUser && (
        <FloatingActionButton 
          currentUser={currentUser}
          onCreateTask={handleCreateTask}
          onFindOpportunities={() => handleNavigate('tasks')}
        />
      )}

      {/* Footer */}
      <motion.footer 
        className="border-t bg-card/30 backdrop-blur-sm py-12 px-4 mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AmiLogo size="md" />
                <h3 className="bg-gradient-to-r from-brasil-green via-brasil-blue to-brasil-green bg-clip-text text-transparent">
                  Ami 🇧🇷
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Conectando amigos voluntários brasileiros com oportunidades de impacto local. 
                Pequenas ações, grandes transformações para o Brasil.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4>Para Voluntários</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handleNavigate('about')} className="hover:text-foreground transition-colors">Como funciona</button></li>
                <li><button onClick={() => handleProtectedNavigation('tasks')} className="hover:text-foreground transition-colors">Encontrar oportunidades</button></li>
                <li><button onClick={() => handleProtectedNavigation('profile')} className="hover:text-foreground transition-colors">Meu perfil</button></li>
                <li><button onClick={() => handleProtectedNavigation('certificates')} className="hover:text-foreground transition-colors">Certificados</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4>Para ONGs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handleProtectedNavigation('for-orgs')} className="hover:text-foreground transition-colors">Cadastrar organização</button></li>
                <li><button onClick={() => { if (!currentUser) { setShowAuthModal(true); return; } handleCreateTask(); }} className="hover:text-foreground transition-colors">Publicar oportunidade</button></li>
                <li><button onClick={() => { if (!currentUser) { setShowAuthModal(true); return; } console.log('Gerenciar voluntários'); }} className="hover:text-foreground transition-colors">Gerenciar voluntários</button></li>
                <li><button onClick={() => { if (!currentUser) { setShowAuthModal(true); return; } console.log('Recursos'); }} className="hover:text-foreground transition-colors">Recursos</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4>Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => { if (!currentUser) { setShowAuthModal(true); return; } console.log('Central de ajuda'); }} className="hover:text-foreground transition-colors">Central de ajuda</button></li>
                <li><button onClick={() => { if (!currentUser) { setShowAuthModal(true); return; } console.log('Contato'); }} className="hover:text-foreground transition-colors">Contato</button></li>
                <li><button onClick={() => handleProtectedNavigation('notifications')} className="hover:text-foreground transition-colors">Notificações</button></li>
                <li><button onClick={() => handleProtectedNavigation('settings')} className="hover:text-foreground transition-colors">Configurações</button></li>
                <li><button onClick={() => handleNavigate('brand')} className="hover:text-foreground transition-colors">Identidade visual</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Ami. Todos os direitos reservados. Desenvolvido com <span className="text-brasil-green">❤️</span> para transformar comunidades brasileiras 🇧🇷</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
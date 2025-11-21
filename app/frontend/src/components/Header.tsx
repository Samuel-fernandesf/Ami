import { motion } from 'motion/react';
import { LogIn, UserPlus, User, Building2, Calendar, LogOut, Bell, Settings, Award, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BrazilianFlag } from './BrazilianFlag';
import { AmiLogo } from './AmiLogo';
import { User as UserType } from '../types';

interface HeaderProps {
  currentUser: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ currentUser, onLogin, onLogout, onNavigate }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AmiLogo 
            size="sm" 
            animated={true}
          />
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-lg font-medium bg-gradient-to-r from-brasil-green via-brasil-blue to-brasil-green bg-clip-text text-transparent">
                Ami
              </h1>
              <p className="text-xs text-muted-foreground">Conectando amigos</p>
            </div>
            <BrazilianFlag size="sm" />
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <motion.button
            onClick={() => onNavigate('tasks')}
            className="text-sm hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Oportunidades
          </motion.button>
          <motion.button
            onClick={() => onNavigate('about')}
            className="text-sm hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Como funciona
          </motion.button>
          <motion.button
            onClick={() => onNavigate('for-orgs')}
            className="text-sm hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Para ONGs
          </motion.button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-sm">{currentUser.name.charAt(0)}</span>
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentUser.role === 'volunteer' ? 'Voluntário' : 'Organização'}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    {currentUser.role === 'volunteer' ? (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Minhas Atividades
                      </>
                    ) : (
                      <>
                        <Building2 className="h-4 w-4 mr-2" />
                        Dashboard
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('certificates')}>
                    <Award className="h-4 w-4 mr-2" />
                    Certificados
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('messages')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mensagens
                    <Badge className="ml-auto bg-brasil-blue text-white text-xs px-1.5 py-0.5">5</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('notifications')}>
                    <Bell className="h-4 w-4 mr-2" />
                    Notificações
                    <Badge className="ml-auto bg-brasil-green text-white text-xs px-1.5 py-0.5">3</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2" onClick={onLogin}>
                <LogIn className="h-4 w-4" />
                Entrar
              </Button>
              <Button size="sm" className="gap-2" onClick={onLogin}>
                <UserPlus className="h-4 w-4" />
                Cadastrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Heart, Calendar, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FloatingActionButtonProps {
  onCreateTask?: () => void;
  onFindOpportunities?: () => void;
  currentUser?: any;
}

export function FloatingActionButton({ onCreateTask, onFindOpportunities, currentUser }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = currentUser?.role === 'organization' 
    ? [
        { 
          icon: Plus, 
          label: 'Nova oportunidade', 
          onClick: onCreateTask,
          color: 'bg-brasil-green hover:bg-brasil-green-dark'
        },
        { 
          icon: Calendar, 
          label: 'Gerenciar eventos', 
          onClick: () => {},
          color: 'bg-brasil-blue hover:bg-brasil-blue-dark'
        },
        { 
          icon: MessageCircle, 
          label: 'Mensagens', 
          onClick: () => {},
          color: 'bg-brasil-yellow-dark hover:bg-brasil-yellow'
        }
      ]
    : [
        { 
          icon: Heart, 
          label: 'Encontrar oportunidades', 
          onClick: onFindOpportunities,
          color: 'bg-brasil-green hover:bg-brasil-green-dark'
        },
        { 
          icon: Calendar, 
          label: 'Minhas atividades', 
          onClick: () => {},
          color: 'bg-brasil-blue hover:bg-brasil-blue-dark'
        },
        { 
          icon: MessageCircle, 
          label: 'Mensagens', 
          onClick: () => {},
          color: 'bg-brasil-yellow-dark hover:bg-brasil-yellow'
        }
      ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  y: 20, 
                  scale: 0.8,
                  transition: { delay: (actions.length - index - 1) * 0.1 }
                }}
                onClick={action.onClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-200 ${action.color}`}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-brasil-green to-brasil-green-light text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
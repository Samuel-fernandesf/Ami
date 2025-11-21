import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { TaskCard } from './TaskCard';
import { TaskFilters, TaskFilters as TaskFiltersType } from './TaskFilters';
import { TaskDetailModal } from './TaskDetailModal';
import { Task } from '../types';
import { mockTasks } from '../lib/data';

// Mock data expandido com campos necessários para o modal detalhado
const enhancedMockTasks = mockTasks.map(task => ({
  ...task,
  fullDescription: `${task.description} Esta é uma oportunidade única de fazer a diferença na sua comunidade. Junte-se a nós e ajude a transformar vidas através de pequenas ações que geram grande impacto.`,
  address: `${task.location}, São Paulo - SP, 01234-567`,
  requirements: ['Maior de 16 anos', 'Disponibilidade no horário', 'Vontade de ajudar'],
  whatToBring: ['Documento de identidade', 'Roupa confortável', 'Garrafa de água'],
  benefits: ['Certificado de participação', 'Networking com voluntários', 'Experiência transformadora'],
  organizer: {
    name: task.organization.name,
    role: 'Coordenador',
    rating: 4.8,
    totalEvents: 15
  },
  images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400'],
  tags: ['voluntariado', 'comunidade', 'impacto social'],
  applied: false,
  favorited: false,
  verified: true,
  impact: `Esta atividade pode beneficiar até ${task.spotsAvailable * 5} pessoas da comunidade local.`,
  difficulty: 'facil' as const,
  category: task.category || 'assistencia-social',
  time: '14:00',
  duration: `${task.durationHours}h`,
  maxParticipants: task.spotsAvailable
}));

export function TaskList() {
  const [tasks] = useState(enhancedMockTasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFiltersType>({
    search: '',
    categories: [],
    location: '',
    distance: 10,
    duration: '',
    date: '',
    participants: '',
    difficulty: [],
    sortBy: 'recent'
  });

  const filteredTasks = tasks.filter(task => {
    // Filtro de busca
    const matchesSearch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.organization.name.toLowerCase().includes(filters.search.toLowerCase());

    // Filtro de categorias
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(task.category);

    // Filtro de localização
    const matchesLocation = !filters.location || 
      task.location.toLowerCase().includes(filters.location.toLowerCase());

    // Filtro de duração
    const matchesDuration = !filters.duration ||
      (filters.duration === '1h' && task.durationHours <= 1) ||
      (filters.duration === '2h' && task.durationHours <= 2) ||
      (filters.duration === '3h' && task.durationHours <= 3) ||
      (filters.duration === 'morning' && task.durationHours >= 3) ||
      (filters.duration === 'afternoon' && task.durationHours >= 3);

    // Filtro de participantes
    const matchesParticipants = !filters.participants ||
      (filters.participants === 'small' && task.maxParticipants <= 10) ||
      (filters.participants === 'medium' && task.maxParticipants > 10 && task.maxParticipants <= 25) ||
      (filters.participants === 'large' && task.maxParticipants > 25);

    // Filtro de dificuldade
    const matchesDifficulty = filters.difficulty.length === 0 || 
      filters.difficulty.includes(task.difficulty);

    return matchesSearch && matchesCategory && matchesLocation && 
           matchesDuration && matchesParticipants && matchesDifficulty && task.active;
  }).sort((a, b) => {
    // Ordenação
    switch (filters.sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'participants':
        return b.participants - a.participants;
      case 'distance':
        return 0; // Implementar quando houver dados de distância
      default:
        return new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime();
    }
  });

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const handleApply = (taskId: string) => {
    // Implementar lógica de inscrição
    console.log('Applied to task:', taskId);
  };

  const handleFavorite = (taskId: string) => {
    // Implementar lógica de favoritar
    console.log('Favorited task:', taskId);
  };

  return (
    <motion.section 
      className="py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl mb-2">Oportunidades disponíveis</h2>
          <p className="text-muted-foreground">
            Encontre a atividade perfeita para você contribuir com sua comunidade
          </p>
        </motion.div>

        {/* Filtros Avançados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </motion.div>

        {/* Resultados */}
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            {filteredTasks.length} oportunidade{filteredTasks.length !== 1 ? 's' : ''} encontrada{filteredTasks.length !== 1 ? 's' : ''}
          </p>
          {filteredTasks.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Ordenado por: {
                filters.sortBy === 'recent' ? 'Mais recentes' :
                filters.sortBy === 'date' ? 'Data da atividade' :
                filters.sortBy === 'distance' ? 'Distância' :
                'Nº participantes'
              }
            </p>
          )}
        </motion.div>

        {/* Grid de Tarefas */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
              >
                <TaskCard
                  task={task}
                  onViewDetails={handleTaskClick}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-muted/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ❓
              </motion.div>
            </div>
            <h3 className="text-xl mb-2">Nenhuma oportunidade encontrada</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Não encontramos atividades que correspondam aos seus filtros. 
              Tente ajustar os critérios de busca.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                onClick={() => setFilters({
                  search: '',
                  categories: [],
                  location: '',
                  distance: 10,
                  duration: '',
                  date: '',
                  participants: '',
                  difficulty: [],
                  sortBy: 'recent'
                })}
                className="border-brasil-green/30 hover:bg-brasil-green/10"
              >
                Limpar todos os filtros
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Detalhes */}
        <TaskDetailModal
          task={selectedTask}
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTask(null);
          }}
          onApply={handleApply}
          onFavorite={handleFavorite}
        />
      </div>
    </motion.section>
  );
}
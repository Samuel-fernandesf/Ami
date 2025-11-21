import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Building2, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Task } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TaskCardProps {
  task: Task;
  onViewDetails?: (task: Task) => void;
  compact?: boolean;
}

export function TaskCard({ task, onViewDetails, compact = false }: TaskCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isUpcoming = task.date > new Date();
  const spotsRemaining = task.slots; // In real app, would calculate remaining spots

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-brasil-green/20">
        {/* Animated background gradient with Brazilian colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-brasil-green/5 via-transparent to-brasil-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {!compact && (
          <div className="aspect-video overflow-hidden relative">
            {task.image ? (
              <>
                <ImageWithFallback
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Não foi disponibilizada foto da ação
                  </p>
                  <p className="text-xs text-orange-600">
                    ⚠️ Apenas organizações com mais de 3 anos podem publicar sem foto
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <motion.h3 
              className="line-clamp-2 group-hover:text-brasil-green transition-colors duration-300"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {task.title}
            </motion.h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <Building2 className="h-3 w-3 flex-shrink-0" />
              <span className="text-xs truncate">{task.organization.name}</span>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Badge variant={isUpcoming ? 'default' : 'secondary'} className="flex-shrink-0">
              {isUpcoming ? 'Aberto' : 'Encerrado'}
            </Badge>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(task.date)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{task.durationHours}h</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground col-span-2">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{task.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{spotsRemaining} vagas</span>
          </div>
          
          {onViewDetails && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onViewDetails(task)}
                className="text-xs h-7 hover:bg-brasil-green hover:text-white border-brasil-green/30 text-brasil-green transition-all duration-200"
              >
                Ver detalhes
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
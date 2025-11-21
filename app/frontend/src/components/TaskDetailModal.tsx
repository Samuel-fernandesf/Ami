import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MapPin, Calendar, Clock, Users, Heart, Share2, Flag, 
  CheckCircle, Star, MessageCircle, Phone, Mail, Navigation,
  Award, AlertCircle, ThumbsUp, Camera, FileText
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface Task {
  id: string;
  title: string;
  organization: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  participants: number;
  maxParticipants: number;
  category: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  requirements: string[];
  whatToBring: string[];
  benefits: string[];
  organizer: {
    name: string;
    role: string;
    avatar?: string;
    rating: number;
    totalEvents: number;
  };
  images: string[];
  tags: string[];
  applied: boolean;
  favorited: boolean;
  verified: boolean;
  impact: string;
  previousEvents?: number;
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (taskId: string) => void;
  onFavorite: (taskId: string) => void;
}

export function TaskDetailModal({ task, isOpen, onClose, onApply, onFavorite }: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [showAllImages, setShowAllImages] = useState(false);

  if (!task) return null;

  const handleApply = () => {
    onApply(task.id);
    toast.success('Inscrição realizada com sucesso!');
  };

  const handleFavorite = () => {
    onFavorite(task.id);
    toast.success(task.favorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/task/${task.id}`);
    toast.success('Link copiado para área de transferência!');
  };

  const handleContact = (method: 'phone' | 'email') => {
    if (method === 'phone') {
      toast.info('Funcionalidade de contato será implementada em breve');
    } else {
      toast.info('Funcionalidade de email será implementada em breve');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-700';
      case 'medio': return 'bg-yellow-100 text-yellow-700';
      case 'dificil': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'Fácil';
      case 'medio': return 'Médio';
      case 'dificil': return 'Difícil';
      default: return difficulty;
    }
  };

  const progressPercentage = (task.participants / task.maxParticipants) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogTitle className="sr-only">Detalhes da Oportunidade: {task?.title || 'Carregando...'}</DialogTitle>
        <DialogDescription className="sr-only">
          Informações detalhadas sobre a oportunidade de voluntariado, incluindo descrição, requisitos e como participar
        </DialogDescription>
        
        <div className="flex flex-col h-full">
          {/* Header com imagem */}
          <div className="relative h-48 bg-gradient-to-r from-brasil-green to-brasil-blue overflow-hidden">
            {task.images && task.images.length > 0 ? (
              <img 
                src={task.images[0]} 
                alt={task.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center p-6 max-w-md">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Não foi disponibilizada foto da ação
                  </p>
                  {/* Simulate organization years - in real app this would come from data */}
                  {(task.organizer?.totalEvents || 0) < 50 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        ⚠️ Apenas membros com mais de 3 anos na plataforma podem publicar oportunidades sem foto
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Overlay com botões */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-white/90 hover:bg-white border-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={`border-0 ${task.favorited 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-white/90 hover:bg-white'
                }`}
              >
                <Heart className={`h-4 w-4 ${task.favorited ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {task.verified && (
                <Badge className="bg-white/90 text-primary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              )}
              <Badge className={getDifficultyColor(task.difficulty)}>
                {getDifficultyLabel(task.difficulty)}
              </Badge>
            </div>
          </div>

          {/* Header info */}
          <div className="p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl mb-2">{task.title}</h1>
                <p className="text-muted-foreground mb-3">{task.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(task.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.time} ({task.duration})
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {task.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress e organizador */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Inscrições</span>
                  <span className="text-sm text-muted-foreground">
                    {task.participants}/{task.maxParticipants}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                {progressPercentage > 80 && (
                  <p className="text-xs text-orange-600 mt-1">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    Poucas vagas restantes!
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={task.organizer.avatar} />
                    <AvatarFallback>{task.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{task.organizer.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {task.organizer.rating}
                      </div>
                      <span>•</span>
                      <span>{task.organizer.totalEvents} eventos</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleContact('phone')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleContact('email')}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                  <TabsTrigger value="location">Localização</TabsTrigger>
                  <TabsTrigger value="photos">Fotos ({task.images?.length || 0})</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <TabsContent value="details" className="space-y-6 mt-6">
                  <div>
                    <h3 className="mb-3">Sobre a atividade</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {task.fullDescription || task.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3">Impacto esperado</h3>
                    <div className="bg-brasil-green/10 border border-brasil-green/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-brasil-green mb-2">
                        <Award className="h-5 w-5" />
                        <span className="font-medium">Resultado esperado</span>
                      </div>
                      <p className="text-sm">{task.impact}</p>
                    </div>
                  </div>

                  {task.benefits && task.benefits.length > 0 && (
                    <div>
                      <h3 className="mb-3">Benefícios para voluntários</h3>
                      <ul className="space-y-2">
                        {task.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <ThumbsUp className="h-4 w-4 text-brasil-green" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {task.tags && task.tags.length > 0 && (
                    <div>
                      <h3 className="mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6 mt-6">
                  {task.requirements && task.requirements.length > 0 && (
                    <div>
                      <h3 className="mb-3">Requisitos</h3>
                      <ul className="space-y-2">
                        {task.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-brasil-green mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {task.whatToBring && task.whatToBring.length > 0 && (
                    <div>
                      <h3 className="mb-3">O que levar</h3>
                      <ul className="space-y-2">
                        {task.whatToBring.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-800 mb-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Importante</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Certifique-se de ler todos os requisitos antes de se inscrever. 
                      Em caso de dúvidas, entre em contato com o organizador.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-6 mt-6">
                  <div>
                    <h3 className="mb-3">Endereço</h3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brasil-green mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">{task.location}</p>
                          <p className="text-sm text-muted-foreground">{task.address}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Direções
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 h-48 flex items-center justify-center">
                    <div className="text-center text-blue-600">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Mapa será carregado aqui</p>
                      <p className="text-xs text-blue-500">Integração com Google Maps em breve</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-6 mt-6">
                  {task.images && task.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(showAllImages ? task.images : task.images.slice(0, 6)).map((image, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer"
                        >
                          <img 
                            src={image} 
                            alt={`${task.title} - Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Camera className="h-12 w-12 mx-auto mb-4" />
                      <p>Nenhuma foto disponível para esta atividade</p>
                    </div>
                  )}

                  {task.images && task.images.length > 6 && !showAllImages && (
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAllImages(true)}
                      >
                        Ver todas as fotos ({task.images.length})
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer com ações */}
          <div className="border-t p-6">
            <div className="flex gap-3">
              <Button
                onClick={handleApply}
                disabled={task.applied || task.participants >= task.maxParticipants}
                className="flex-1 bg-brasil-green hover:bg-brasil-green-dark"
              >
                {task.applied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Inscrito
                  </>
                ) : task.participants >= task.maxParticipants ? (
                  'Vagas esgotadas'
                ) : (
                  'Inscrever-se'
                )}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
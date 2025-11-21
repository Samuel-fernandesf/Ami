import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, MapPin, Users, FileText, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    slots: '',
    requirements: '',
    materials: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onTaskCreated();
      setIsLoading(false);
      onClose();
      setCurrentStep(1);
      setFormData({
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        slots: '',
        requirements: '',
        materials: ''
      });
    }, 1500);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const categories = [
    'Educação',
    'Meio Ambiente',
    'Assistência Social',
    'Saúde',
    'Cultura e Arte',
    'Esportes',
    'Tecnologia',
    'Outros'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto p-0 bg-background/95 backdrop-blur-xl border border-border/50">
        <DialogTitle className="sr-only">Criar Nova Oportunidade</DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para criar uma nova oportunidade de voluntariado na plataforma Ami
        </DialogDescription>
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        
        {/* Header */}
        <div className="relative border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl">Nova Oportunidade</h2>
              <p className="text-sm text-muted-foreground">
                Crie uma nova oportunidade de voluntariado
              </p>
            </div>

          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                    step <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative p-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg mb-2">Informações básicas</h3>
                  <p className="text-sm text-muted-foreground">
                    Defina o título, descrição e categoria da oportunidade
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título da oportunidade *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Organizar doações para famílias"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição detalhada *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva a atividade, objetivos e o que os voluntários farão..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg mb-2">Data e local</h3>
                  <p className="text-sm text-muted-foreground">
                    Quando e onde a atividade acontecerá
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horário *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (horas) *</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutos</SelectItem>
                        <SelectItem value="1">1 hora</SelectItem>
                        <SelectItem value="1.5">1 hora e 30 min</SelectItem>
                        <SelectItem value="2">2 horas</SelectItem>
                        <SelectItem value="3">3 horas</SelectItem>
                        <SelectItem value="4">4 horas</SelectItem>
                        <SelectItem value="6">6 horas</SelectItem>
                        <SelectItem value="8">8 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slots">Número de vagas *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="slots"
                        type="number"
                        min="1"
                        max="50"
                        placeholder="Ex: 5"
                        className="pl-10"
                        value={formData.slots}
                        onChange={(e) => setFormData(prev => ({ ...prev, slots: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Local *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Ex: Centro Comunitário - Rua das Flores, 123"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg mb-2">Informações adicionais</h3>
                  <p className="text-sm text-muted-foreground">
                    Requisitos e materiais necessários (opcional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requisitos para voluntários</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Ex: Maior de 16 anos, disponibilidade para trabalho físico..."
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materials">Materiais necessários</Label>
                  <Textarea
                    id="materials"
                    placeholder="Ex: Roupas confortáveis, luvas de proteção (fornecidas)..."
                    rows={3}
                    value={formData.materials}
                    onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                  />
                </div>

                <div className="bg-accent/50 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm">Resumo da oportunidade:</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Título:</strong> {formData.title || 'Não definido'}</p>
                    <p><strong>Categoria:</strong> {formData.category || 'Não definida'}</p>
                    <p><strong>Data:</strong> {formData.date || 'Não definida'} às {formData.time || '--:--'}</p>
                    <p><strong>Duração:</strong> {formData.duration || 'Não definida'} hora(s)</p>
                    <p><strong>Vagas:</strong> {formData.slots || 'Não definido'}</p>
                    <p><strong>Local:</strong> {formData.location || 'Não definido'}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.title || !formData.category || !formData.description)) ||
                  (currentStep === 2 && (!formData.date || !formData.time || !formData.duration || !formData.slots || !formData.location))
                }
              >
                Próximo
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isLoading ? 'Criando...' : 'Criar oportunidade'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
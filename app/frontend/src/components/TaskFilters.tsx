import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, MapPin, Calendar, Clock, Users, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export interface TaskFilters {
  search: string;
  categories: string[];
  location: string;
  distance: number;
  duration: string;
  date: string;
  participants: string;
  difficulty: string[];
  sortBy: string;
}

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categories = [
  { id: 'educacao', label: 'Educação', color: 'bg-blue-100 text-blue-700' },
  { id: 'meio-ambiente', label: 'Meio Ambiente', color: 'bg-green-100 text-green-700' },
  { id: 'assistencia-social', label: 'Assistência Social', color: 'bg-purple-100 text-purple-700' },
  { id: 'saude', label: 'Saúde', color: 'bg-red-100 text-red-700' },
  { id: 'cultura', label: 'Cultura', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'esportes', label: 'Esportes', color: 'bg-orange-100 text-orange-700' },
  { id: 'tecnologia', label: 'Tecnologia', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'animais', label: 'Proteção Animal', color: 'bg-pink-100 text-pink-700' }
];

const difficulties = [
  { id: 'facil', label: 'Fácil', color: 'bg-green-100 text-green-700' },
  { id: 'medio', label: 'Médio', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'dificil', label: 'Difícil', color: 'bg-red-100 text-red-700' }
];

export function TaskFilters({ filters, onFiltersChange, isOpen, onToggle }: TaskFiltersProps) {
  const updateFilter = (key: keyof TaskFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    updateFilter('categories', newCategories);
  };

  const toggleDifficulty = (difficultyId: string) => {
    const newDifficulties = filters.difficulty.includes(difficultyId)
      ? filters.difficulty.filter(d => d !== difficultyId)
      : [...filters.difficulty, difficultyId];
    updateFilter('difficulty', newDifficulties);
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const activeFiltersCount = [
    filters.search,
    ...filters.categories,
    filters.location,
    filters.duration,
    filters.date,
    filters.participants,
    ...filters.difficulty
  ].filter(f => f && f.length > 0).length + (filters.distance !== 10 ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Barra de pesquisa e toggle de filtros */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar oportunidades..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-brasil-green/20 focus:border-brasil-green"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={onToggle}
          className={`gap-2 border-brasil-green/30 hover:bg-brasil-green/10 ${
            isOpen ? 'bg-brasil-green/10 text-brasil-green' : ''
          }`}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 bg-brasil-green text-white">
              {activeFiltersCount}
            </Badge>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Painel de filtros expandido */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-brasil-green/20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg">Filtros Avançados</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Limpar todos
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Localização e Distância */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-brasil-green" />
                      Localização
                    </div>
                    <Input
                      placeholder="Cidade, estado..."
                      value={filters.location}
                      onChange={(e) => updateFilter('location', e.target.value)}
                    />
                    <div className="space-y-2">
                      <Label className="text-sm">Distância máxima: {filters.distance}km</Label>
                      <Slider
                        value={[filters.distance]}
                        onValueChange={(value) => updateFilter('distance', value[0])}
                        max={50}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Data e Duração */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-brasil-green" />
                      Data & Duração
                    </div>
                    <Select value={filters.date} onValueChange={(value) => updateFilter('date', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quando?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Hoje</SelectItem>
                        <SelectItem value="tomorrow">Amanhã</SelectItem>
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="month">Este mês</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hora</SelectItem>
                        <SelectItem value="2h">2 horas</SelectItem>
                        <SelectItem value="3h">3 horas</SelectItem>
                        <SelectItem value="morning">Manhã (3-4h)</SelectItem>
                        <SelectItem value="afternoon">Tarde (3-4h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Participantes e Ordenação */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Users className="h-4 w-4 text-brasil-green" />
                      Grupo & Ordem
                    </div>
                    <Select value={filters.participants} onValueChange={(value) => updateFilter('participants', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tamanho do grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno (até 10)</SelectItem>
                        <SelectItem value="medium">Médio (11-25)</SelectItem>
                        <SelectItem value="large">Grande (26+)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Mais recentes</SelectItem>
                        <SelectItem value="date">Data da atividade</SelectItem>
                        <SelectItem value="distance">Distância</SelectItem>
                        <SelectItem value="participants">Nº participantes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Categorias */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Filter className="h-4 w-4 text-brasil-green" />
                    Categorias
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant={filters.categories.includes(category.id) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            filters.categories.includes(category.id)
                              ? 'bg-brasil-green text-white border-brasil-green'
                              : 'hover:bg-brasil-green/10 hover:border-brasil-green/30'
                          }`}
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.label}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Dificuldade */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-brasil-green" />
                    Nível de Dificuldade
                  </div>
                  <div className="flex gap-2">
                    {difficulties.map((difficulty) => (
                      <motion.div key={difficulty.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant={filters.difficulty.includes(difficulty.id) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            filters.difficulty.includes(difficulty.id)
                              ? 'bg-brasil-green text-white border-brasil-green'
                              : 'hover:bg-brasil-green/10 hover:border-brasil-green/30'
                          }`}
                          onClick={() => toggleDifficulty(difficulty.id)}
                        >
                          {difficulty.label}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Edit3, Calendar, MapPin, Mail, Phone, Heart, 
  Award, Clock, Users, Star, Camera, Settings, 
  BarChart3, TrendingUp, Target, Badge as BadgeIcon, Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { StatsCounter } from './StatsCounter';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onNavigate: (page: string) => void;
}

const mockUserStats = {
  totalActivities: 12,
  totalHours: 28,
  totalImpact: 150,
  streak: 5,
  rating: 4.9,
  badges: 8,
  completionRate: 95
};

const mockRecentActivities = [
  {
    id: '1',
    title: 'Limpeza de Praia',
    organization: 'Instituto Verde Vida',
    date: '2024-03-15',
    hours: 3,
    status: 'completed',
    rating: 5
  },
  {
    id: '2',
    title: 'Distribuição de Alimentos',
    organization: 'Fundação Esperança',
    date: '2024-03-10',
    hours: 2,
    status: 'completed',
    rating: 5
  },
  {
    id: '3',
    title: 'Aula de Programação',
    organization: 'Projeto Futuro',
    date: '2024-03-05',
    hours: 2,
    status: 'completed',
    rating: 4
  }
];

const mockBadges = [
  { id: '1', name: 'Primeiro Passo', icon: '🚀', rarity: 'common' },
  { id: '2', name: 'Voluntário Dedicado', icon: '💝', rarity: 'rare' },
  { id: '3', name: 'Protetor da Natureza', icon: '🌱', rarity: 'epic' },
  { id: '4', name: 'Mentor', icon: '🎓', rarity: 'legendary' }
];

export function UserProfile({ user, onNavigate }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header do Perfil */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-brasil-green via-brasil-yellow/30 to-brasil-blue relative">
            <div className="absolute inset-0 bg-black/10" />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            >
              <Camera className="h-4 w-4 mr-2" />
              Alterar capa
            </Button>
          </div>
          
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-white border-2 border-white shadow-md"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      São Paulo, SP
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Membro desde Mar 2024
                    </div>
                  </div>
                </div>

                {/* Badges Principais */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-brasil-green/10 text-brasil-green border-brasil-green/20">
                    <Heart className="h-3 w-3 mr-1" />
                    Voluntário Ativo
                  </Badge>
                  <Badge className="bg-brasil-blue/10 text-brasil-blue border-brasil-blue/20">
                    <Star className="h-3 w-3 mr-1" />
                    {mockUserStats.rating} ⭐
                  </Badge>
                  <Badge className="bg-brasil-yellow/20 text-brasil-yellow-dark border-brasil-yellow-dark/20">
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    {mockUserStats.badges} certificados
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('settings')}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
                <Button className="gap-2 bg-brasil-green hover:bg-brasil-green-dark">
                  <Edit3 className="h-4 w-4" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              key: 'activities', 
              label: 'Atividades', 
              value: mockUserStats.totalActivities, 
              icon: Calendar, 
              color: 'from-brasil-green to-brasil-green-light',
              delay: 0
            },
            { 
              key: 'hours', 
              label: 'Horas Voluntárias', 
              value: mockUserStats.totalHours, 
              icon: Clock, 
              color: 'from-brasil-blue to-brasil-blue-light',
              suffix: 'h',
              delay: 200
            },
            { 
              key: 'impact', 
              label: 'Pessoas Impactadas', 
              value: mockUserStats.totalImpact, 
              icon: Users, 
              color: 'from-brasil-yellow to-brasil-yellow-light',
              delay: 400
            },
            { 
              key: 'streak', 
              label: 'Sequência', 
              value: mockUserStats.streak, 
              icon: TrendingUp, 
              color: 'from-purple-500 to-purple-600',
              suffix: ' semanas',
              delay: 600
            }
          ].map((stat) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: stat.delay / 1000 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl mb-1">
                    <StatsCounter 
                      endValue={stat.value} 
                      suffix={stat.suffix || ''}
                      startDelay={stat.delay}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs de Conteúdo */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="activities">Atividades</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Resumo de Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-brasil-green/10 rounded-lg">
                      <div className="text-2xl text-brasil-green mb-1">{mockUserStats.totalActivities}</div>
                      <div className="text-sm text-muted-foreground">Atividades Completadas</div>
                    </div>
                    <div className="text-center p-4 bg-brasil-blue/10 rounded-lg">
                      <div className="text-2xl text-brasil-blue mb-1">{mockUserStats.totalHours}h</div>
                      <div className="text-sm text-muted-foreground">Horas Voluntárias</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Taxa de conclusão</span>
                      <span>{mockUserStats.completionRate}%</span>
                    </div>
                    <Progress value={mockUserStats.completionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certificados Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Proteção Ambiental', date: '15 Mar 2024', organization: 'Instituto Verde' },
                      { name: 'Educação Comunitária', date: '10 Mar 2024', organization: 'Fundação Esperança' },
                      { name: 'Assistência Social', date: '05 Mar 2024', organization: 'Projeto Futuro' }
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="bg-brasil-green/20 p-2 rounded-lg">
                          <Award className="h-4 w-4 text-brasil-green" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground">{cert.organization} • {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => onNavigate('certificates')}
                  >
                    Ver Todos os Certificados
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Atividades Recentes */}
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-brasil-green/10 p-2 rounded-lg">
                          <Heart className="h-5 w-5 text-brasil-green" />
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.organization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          {activity.rating}
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.hours}h</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificados */}
          <TabsContent value="certificates">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Meus Certificados</h2>
                <Button onClick={() => onNavigate('certificates')}>
                  Ver Todos
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: '1',
                    title: 'Proteção Ambiental - Limpeza de Praia',
                    organization: 'Instituto Verde Vida',
                    activity: 'Limpeza de Praia - Copacabana',
                    date: '15 Mar 2024',
                    hours: 3,
                    category: 'Meio Ambiente',
                    impact: 'Coletados 120kg de lixo, protegendo a vida marinha',
                    verified: true
                  },
                  {
                    id: '2',
                    title: 'Educação Comunitária',
                    organization: 'Fundação Esperança',
                    activity: 'Distribuição de Alimentos',
                    date: '10 Mar 2024',
                    hours: 2,
                    category: 'Assistência Social',
                    impact: '150 famílias beneficiadas com cestas básicas',
                    verified: true
                  },
                  {
                    id: '3',
                    title: 'Mentoria em Programação',
                    organization: 'Projeto Futuro',
                    activity: 'Aula de Programação para Jovens',
                    date: '05 Mar 2024',
                    hours: 2,
                    category: 'Educação',
                    impact: '20 jovens iniciaram jornada na tecnologia',
                    verified: true
                  }
                ].map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-brasil-green/20">
                      <div className="h-2 bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue" />
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-brasil-green/20 p-1.5 rounded-lg">
                              <Award className="h-4 w-4 text-brasil-green" />
                            </div>
                            {certificate.verified && (
                              <Badge className="bg-brasil-green/10 text-brasil-green border-brasil-green/20 text-xs">
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">{certificate.hours}h</span>
                        </div>
                        
                        <h3 className="font-medium mb-1 line-clamp-2 text-sm">{certificate.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{certificate.organization}</p>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{certificate.activity}</p>
                        
                        <div className="bg-muted/30 p-2 rounded-lg mb-3">
                          <p className="text-xs text-muted-foreground">{certificate.impact}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>{certificate.date}</span>
                          <Badge variant="outline" className="text-xs">
                            {certificate.category}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 text-xs">
                            Ver Certificado
                          </Button>
                          <Button variant="outline" size="sm" className="px-2">
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de atividades seria renderizado aqui</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categorias Preferidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Meio Ambiente', percentage: 40, color: 'bg-green-500' },
                      { category: 'Educação', percentage: 30, color: 'bg-blue-500' },
                      { category: 'Assistência Social', percentage: 20, color: 'bg-purple-500' },
                      { category: 'Saúde', percentage: 10, color: 'bg-red-500' }
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
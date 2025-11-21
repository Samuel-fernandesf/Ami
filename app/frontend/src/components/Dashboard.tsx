import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Award, Plus, Bell, Activity, TrendingUp, CheckCircle, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TaskCard } from './TaskCard';
import { User, Task } from '../types';
import { mockTasks, getApplicationsByVolunteer, getTasksByOrganization } from '../lib/data';

interface DashboardProps {
  user: User;
  onCreateTask?: () => void;
}

export function Dashboard({ user, onCreateTask }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  if (user.role === 'volunteer') {
    return <VolunteerDashboard user={user} selectedTab={selectedTab} onTabChange={setSelectedTab} />;
  } else if (user.role === 'organization') {
    return <OrganizationDashboard user={user} selectedTab={selectedTab} onTabChange={setSelectedTab} onCreateTask={onCreateTask} />;
  }

  return null;
}

function VolunteerDashboard({ user, selectedTab, onTabChange }: { user: User; selectedTab: string; onTabChange: (tab: string) => void }) {
  const applications = getApplicationsByVolunteer(user.id);
  const completedHours = 12; // Mock data
  const totalApplications = applications.length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;

  const stats = [
    { label: 'Horas voluntárias', value: completedHours, icon: Clock, color: 'text-blue-600' },
    { label: 'Atividades completadas', value: 8, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Inscrições ativas', value: approvedApplications, icon: Calendar, color: 'text-purple-600' },
    { label: 'Impacto gerado', value: '142 pessoas', icon: Heart, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Olá, {user.name}! 👋</h1>
              <p className="text-muted-foreground">
                Continue fazendo a diferença na sua comunidade
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Encontrar oportunidades
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-secondary/50 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="activities">Minhas Atividades</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Card - Removidas as metas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Seu resumo de impacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-brasil-green/10 rounded-lg">
                    <div className="text-2xl text-brasil-green mb-1">{completedHours}</div>
                    <div className="text-sm text-muted-foreground">Horas Completadas</div>
                  </div>
                  <div className="text-center p-4 bg-brasil-blue/10 rounded-lg">
                    <div className="text-2xl text-brasil-blue mb-1">8</div>
                    <div className="text-sm text-muted-foreground">Atividades Concluídas</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Continue participando e fazendo a diferença! 💚
                </p>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app, index) => {
                    const task = mockTasks.find(t => t.id === app.taskId);
                    if (!task) return null;
                    
                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-sm">{task.title}</h4>
                          <p className="text-xs text-muted-foreground">{task.organization.name}</p>
                        </div>
                        <Badge variant={app.status === 'approved' ? 'default' : 'secondary'}>
                          {app.status === 'approved' ? 'Confirmado' : 'Pendente'}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <div className="space-y-6">
              {/* Filtros e busca */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="cursor-pointer hover:bg-brasil-green/10 hover:border-brasil-green">
                        Todas ({applications.length})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-brasil-blue/10 hover:border-brasil-blue">
                        Confirmadas ({applications.filter(app => app.status === 'approved').length})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-brasil-yellow/20 hover:border-brasil-yellow-dark">
                        Pendentes ({applications.filter(app => app.status === 'pending').length})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-green-100 hover:border-green-600">
                        Concluídas (8)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de atividades com mais detalhes */}
              <div className="grid grid-cols-1 gap-4">
                {applications.map((app, index) => {
                  const task = mockTasks.find(t => t.id === app.taskId);
                  if (!task) return null;
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-l-4" 
                        style={{ 
                          borderLeftColor: app.status === 'approved' ? '#00A859' : '#FCD116' 
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Info principal */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg mb-1">{task.title}</h3>
                                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {task.organization.name}
                                  </p>
                                </div>
                                <Badge 
                                  variant={app.status === 'approved' ? 'default' : 'secondary'}
                                  className={app.status === 'approved' ? 'bg-brasil-green' : 'bg-brasil-yellow text-brasil-yellow-dark'}
                                >
                                  {app.status === 'approved' ? 'Confirmado' : 'Aguardando'}
                                </Badge>
                              </div>

                              <p className="text-sm line-clamp-2">{task.description}</p>

                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(task.date).toLocaleDateString('pt-BR')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {task.durationHours}h
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {task.location}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {task.category}
                                </Badge>
                                {task.skills?.slice(0, 2).map((skill, i) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-muted/50">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Ações */}
                            <div className="flex lg:flex-col gap-2 justify-end">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Heart className="h-4 w-4" />
                                Ver detalhes
                              </Button>
                              {app.status === 'approved' && (
                                <Button size="sm" className="gap-2 bg-brasil-green hover:bg-brasil-green-dark">
                                  <CheckCircle className="h-4 w-4" />
                                  Confirmar presença
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Histórico de atividades concluídas */}
                <Card className="bg-muted/30 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-brasil-green" />
                      Atividades Concluídas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { 
                          title: 'Limpeza de Praia - Copacabana', 
                          org: 'Instituto Verde Vida',
                          date: '15 Mar 2024', 
                          hours: 3,
                          rating: 5,
                          impact: '120kg de lixo coletados'
                        },
                        { 
                          title: 'Distribuição de Alimentos', 
                          org: 'Fundação Esperança',
                          date: '10 Mar 2024', 
                          hours: 2,
                          rating: 5,
                          impact: '150 famílias beneficiadas'
                        },
                        { 
                          title: 'Aula de Programação', 
                          org: 'Projeto Futuro',
                          date: '05 Mar 2024', 
                          hours: 2,
                          rating: 4,
                          impact: '20 jovens ensinados'
                        }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="bg-brasil-green/20 p-2 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-brasil-green" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{activity.title}</h4>
                              <p className="text-xs text-muted-foreground">{activity.org} • {activity.date}</p>
                              <p className="text-xs text-muted-foreground mt-1">{activity.impact}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm mb-1">
                              {'⭐'.repeat(activity.rating)}
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.hours}h</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: '1',
                  title: 'Proteção Ambiental',
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
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3>{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline">Editar perfil</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrganizationDashboard({ user, selectedTab, onTabChange, onCreateTask }: { 
  user: User; 
  selectedTab: string; 
  onTabChange: (tab: string) => void;
  onCreateTask?: () => void;
}) {
  const organizationTasks = getTasksByOrganization('1'); // Mock org ID
  const totalVolunteers = 24; // Mock data
  const activeOpportunities = organizationTasks.filter(t => t.active).length;

  const stats = [
    { label: 'Oportunidades ativas', value: activeOpportunities, icon: Activity, color: 'text-green-600' },
    { label: 'Voluntários conectados', value: totalVolunteers, icon: Users, color: 'text-blue-600' },
    { label: 'Horas organizadas', value: '156h', icon: Clock, color: 'text-purple-600' },
    { label: 'Impacto gerado', value: '340 pessoas', icon: Heart, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Dashboard - {user.name}</h1>
              <p className="text-muted-foreground">
                Gerencie suas oportunidades e voluntários
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </Button>
              <Button size="sm" className="gap-2" onClick={onCreateTask}>
                <Plus className="h-4 w-4" />
                Nova oportunidade
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-secondary/50 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
            <TabsTrigger value="volunteers">Voluntários</TabsTrigger>
            <TabsTrigger value="profile">Organização</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Oportunidades recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {organizationTasks.slice(0, 3).map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                      >
                        <div className="flex-1">
                          <h4 className="text-sm">{task.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {task.slots} vagas • {task.durationHours}h
                          </p>
                        </div>
                        <Badge>{task.active ? 'Ativa' : 'Inativa'}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atividade da semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Novas inscrições</span>
                      <span className="font-medium">+12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Voluntários confirmados</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Horas programadas</span>
                      <span className="font-medium">24h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle>Voluntários inscritos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lista de voluntários apareceria aqui...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações da organização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3>{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline">Editar informações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
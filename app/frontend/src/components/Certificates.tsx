import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Download, Share2, Star, Calendar, MapPin, Users, Clock, Trophy, Medal, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AmiLogo } from './AmiLogo';

interface Certificate {
  id: string;
  title: string;
  organization: string;
  activity: string;
  date: string;
  hours: number;
  location: string;
  participants: number;
  impact: string;
  verified: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Certificado de Participação',
    organization: 'Instituto Verde Vida',
    activity: 'Limpeza de Praia - Copacabana',
    date: '2024-03-15',
    hours: 3,
    location: 'Rio de Janeiro, RJ',
    participants: 45,
    impact: 'Coletados 120kg de lixo, protegendo a vida marinha',
    verified: true
  },
  {
    id: '2',
    title: 'Certificado de Voluntariado',
    organization: 'Fundação Esperança',
    activity: 'Distribuição de Alimentos',
    date: '2024-03-10',
    hours: 2,
    location: 'São Paulo, SP',
    participants: 25,
    impact: '150 famílias beneficiadas com cestas básicas',
    verified: true
  },
  {
    id: '3',
    title: 'Certificado de Ensino',
    organization: 'Projeto Futuro',
    activity: 'Aula de Programação para Jovens',
    date: '2024-03-05',
    hours: 2,
    location: 'Brasília, DF',
    participants: 15,
    impact: '20 jovens iniciaram jornada na tecnologia',
    verified: true
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Primeiro Passo',
    description: 'Complete sua primeira atividade voluntária',
    icon: '🚀',
    earned: true,
    earnedDate: '2024-03-05',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Voluntário Dedicado',
    description: 'Complete 5 atividades voluntárias',
    icon: '💝',
    earned: true,
    earnedDate: '2024-03-15',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Protetor da Natureza',
    description: 'Participe de 3 atividades ambientais',
    icon: '🌱',
    earned: true,
    earnedDate: '2024-03-15',
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Maratonista do Bem',
    description: 'Complete 10 horas de voluntariado',
    icon: '⏰',
    earned: false,
    progress: 7,
    maxProgress: 10,
    rarity: 'epic'
  },
  {
    id: '5',
    name: 'Líder Comunitário',
    description: 'Organize uma atividade voluntária',
    icon: '👑',
    earned: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary'
  },
  {
    id: '6',
    name: 'Mentor',
    description: 'Ensine 50 pessoas em atividades educativas',
    icon: '🎓',
    earned: false,
    progress: 20,
    maxProgress: 50,
    rarity: 'legendary'
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-300 bg-gray-50';
    case 'rare': return 'border-blue-300 bg-blue-50';
    case 'epic': return 'border-purple-300 bg-purple-50';
    case 'legendary': return 'border-yellow-300 bg-yellow-50';
    default: return 'border-gray-300 bg-gray-50';
  }
};

const getRarityBadgeColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'bg-gray-100 text-gray-700';
    case 'rare': return 'bg-blue-100 text-blue-700';
    case 'epic': return 'bg-purple-100 text-purple-700';
    case 'legendary': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function Certificates() {
  const [activeTab, setActiveTab] = useState('certificates');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const totalHours = mockCertificates.reduce((sum, cert) => sum + cert.hours, 0);
  const earnedAchievements = mockAchievements.filter(a => a.earned).length;

  const downloadCertificate = (certificate: Certificate) => {
    // Simular download
    console.log('Downloading certificate:', certificate.title);
  };

  const shareCertificate = (certificate: Certificate) => {
    // Simular compartilhamento
    console.log('Sharing certificate:', certificate.title);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-brasil-yellow/30 to-brasil-yellow-dark/30 p-3 rounded-xl">
            <Award className="h-6 w-6 text-brasil-yellow-dark" />
          </div>
          <div>
            <h1 className="text-3xl">Certificados & Conquistas</h1>
            <p className="text-muted-foreground">Seu impacto reconhecido e suas conquistas desbloqueadas</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="text-center bg-gradient-to-br from-brasil-green/10 to-brasil-green/5 border-brasil-green/20">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{mockCertificates.length}</div>
                <p className="text-sm text-muted-foreground">Certificados Emitidos</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="text-center bg-gradient-to-br from-brasil-blue/10 to-brasil-blue/5 border-brasil-blue/20">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{totalHours}h</div>
                <p className="text-sm text-muted-foreground">Horas Voluntárias</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="text-center bg-gradient-to-br from-brasil-yellow/20 to-brasil-yellow-dark/10 border-brasil-yellow-dark/20">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{earnedAchievements}</div>
                <p className="text-sm text-muted-foreground">Conquistas Desbloqueadas</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="h-4 w-4" />
              Certificados ({mockCertificates.length})
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              Conquistas ({earnedAchievements}/{mockAchievements.length})
            </TabsTrigger>
          </TabsList>

          {/* Certificados */}
          <TabsContent value="certificates">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-brasil-green/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-brasil-yellow/20 p-2 rounded-lg">
                            <Award className="h-5 w-5 text-brasil-yellow-dark" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{certificate.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{certificate.organization}</p>
                          </div>
                        </div>
                        {certificate.verified && (
                          <Badge className="bg-brasil-green/10 text-brasil-green border-brasil-green/20">
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2">{certificate.activity}</h4>
                        <p className="text-sm text-muted-foreground">{certificate.impact}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(certificate.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {certificate.hours}h
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {certificate.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {certificate.participants} pessoas
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => downloadCertificate(certificate)}
                          className="bg-brasil-green hover:bg-brasil-green-dark flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => shareCertificate(certificate)}
                          className="border-brasil-green/30 hover:bg-brasil-green/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Conquistas */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`${getRarityColor(achievement.rarity)} ${
                    achievement.earned ? 'ring-2 ring-primary/20' : 'opacity-60'
                  } hover:shadow-lg transition-all duration-300 border-2`}>
                    <CardContent className="pt-6 text-center">
                      <div className="relative mb-4">
                        <div className={`text-6xl ${achievement.earned ? 'grayscale-0' : 'grayscale'} transition-all`}>
                          {achievement.icon}
                        </div>
                        {achievement.earned && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="absolute -top-2 -right-2 bg-brasil-green text-white rounded-full p-1"
                          >
                            <Star className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>

                      <h3 className="mb-2">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                      <div className="space-y-3">
                        <Badge className={getRarityBadgeColor(achievement.rarity)}>
                          {achievement.rarity === 'common' ? 'Comum' : 
                           achievement.rarity === 'rare' ? 'Raro' :
                           achievement.rarity === 'epic' ? 'Épico' : 'Lendário'}
                        </Badge>

                        {achievement.earned ? (
                          <div className="text-sm text-brasil-green">
                            ✓ Conquistado em {new Date(achievement.earnedDate!).toLocaleDateString('pt-BR')}
                          </div>
                        ) : achievement.progress !== undefined && achievement.maxProgress ? (
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              {achievement.progress}/{achievement.maxProgress}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div 
                                className="bg-brasil-green h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            🔒 Bloqueado
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
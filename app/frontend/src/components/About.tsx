import { motion } from 'motion/react';
import { 
  Heart, Users, Building2, Clock, Award, Sparkles, 
  Target, TrendingUp, Globe, Shield, Zap, CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AboutProps {
  onNavigate: (view: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const forVolunteers = [
    { icon: '🔍', text: 'Encontre oportunidades de 1-3 horas na sua região' },
    { icon: '🎯', text: 'Filtre por categoria, localização e disponibilidade' },
    { icon: '⚡', text: 'Inscreva-se com apenas um clique' },
    { icon: '🏆', text: 'Receba certificados e badges de reconhecimento' },
    { icon: '📊', text: 'Acompanhe seu impacto e estatísticas pessoais' },
    { icon: '🤝', text: 'Conecte-se com outros voluntários' }
  ];

  const forOrganizations = [
    { icon: '📝', text: 'Publique oportunidades em minutos' },
    { icon: '👥', text: 'Gerencie voluntários através de dashboard intuitivo' },
    { icon: '✅', text: 'Sistema automático de confirmação de participação' },
    { icon: '📈', text: 'Relatórios detalhados de impacto e engajamento' },
    { icon: '🌟', text: 'Sistema de avaliação e feedback' },
    { icon: '🔗', text: 'Ferramentas de comunicação integradas' }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Descubra',
      description: 'Encontre oportunidades que combinam com seus interesses e disponibilidade',
      icon: '🔍',
      color: 'from-brasil-green to-brasil-green-light'
    },
    {
      step: 2,
      title: 'Conecte',
      description: 'Inscreva-se instantaneamente e receba confirmação da organização',
      icon: '🤝',
      color: 'from-brasil-yellow to-brasil-yellow-light'
    },
    {
      step: 3,
      title: 'Transforme',
      description: 'Participe da atividade e veja o impacto real na sua comunidade',
      icon: '✨',
      color: 'from-brasil-blue to-brasil-blue-light'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Impacto Real',
      description: 'Cada hora voluntariada gera mudanças tangíveis nas comunidades brasileiras',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conectamos pessoas que compartilham o desejo de fazer a diferença',
      color: 'from-brasil-blue to-brasil-blue-light'
    },
    {
      icon: Clock,
      title: 'Acessibilidade',
      description: 'Micro-oportunidades que cabem na rotina de qualquer pessoa',
      color: 'from-brasil-green to-brasil-green-light'
    },
    {
      icon: Shield,
      title: 'Transparência',
      description: 'Verificação de organizações e rastreamento completo de impacto',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    {
      value: '200+',
      label: 'Voluntários Ativos',
      icon: Users,
      description: 'Pessoas comprometidas com o bem social'
    },
    {
      value: '50+',
      label: 'ONGs Parceiras',
      icon: Building2,
      description: 'Organizações verificadas e confiáveis'
    },
    {
      value: '1000+',
      label: 'Horas Doadas',
      icon: Clock,
      description: 'Tempo investido em transformação social'
    },
    {
      value: '5000+',
      label: 'Vidas Impactadas',
      icon: Heart,
      description: 'Pessoas beneficiadas pelas ações'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Interface Intuitiva',
      description: 'Design moderno e fácil de usar, pensado para todas as idades'
    },
    {
      icon: Target,
      title: 'Filtros Avançados',
      description: 'Encontre exatamente o que procura com nosso sistema de busca'
    },
    {
      icon: Award,
      title: 'Sistema de Reconhecimento',
      description: 'Certificados digitais e badges para celebrar seu impacto'
    },
    {
      icon: TrendingUp,
      title: 'Análise de Impacto',
      description: 'Acompanhe métricas detalhadas do seu trabalho voluntário'
    },
    {
      icon: Globe,
      title: 'Alcance Nacional',
      description: 'Oportunidades em todo o Brasil, conectando comunidades'
    },
    {
      icon: Zap,
      title: 'Inscrição Instantânea',
      description: 'Do interesse à ação em apenas alguns cliques'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.div
          className="bg-gradient-to-br from-brasil-green/20 to-brasil-blue/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="h-10 w-10 text-brasil-green" />
        </motion.div>
        <h1 className="text-4xl mb-6">Como funciona o Ami</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubra como nossa plataforma conecta amigos voluntários e organizações através de micro-ações que geram macro-impacto
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-brasil-green/10 to-brasil-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-7 w-7 text-brasil-green" />
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <p className="font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Para Voluntários e ONGs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-brasil-green/10 to-brasil-green/5 p-6 rounded-xl border border-brasil-green/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brasil-green/20 p-2 rounded-lg">
                <Users className="h-6 w-6 text-brasil-green" />
              </div>
              <h2 className="text-2xl text-brasil-green">Para Voluntários</h2>
            </div>
            <ul className="space-y-4">
              {forVolunteers.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => onNavigate('tasks')}
                className="w-full bg-brasil-green hover:bg-brasil-green-dark"
              >
                Encontrar Oportunidades
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-brasil-blue/10 to-brasil-blue/5 p-6 rounded-xl border border-brasil-blue/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brasil-blue/20 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-brasil-blue" />
              </div>
              <h2 className="text-2xl text-brasil-blue">Para ONGs</h2>
            </div>
            <ul className="space-y-4">
              {forOrganizations.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => onNavigate('for-orgs')}
                className="w-full bg-brasil-blue hover:bg-brasil-blue-dark"
              >
                Cadastrar Organização
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Processo em 3 passos */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl mb-4">Processo Simples em 3 Passos</h2>
        <p className="text-muted-foreground mb-12">
          Do interesse à ação: como transformar vontade em impacto real
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((item) => (
            <motion.div
              key={item.step}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + (item.step * 0.2) }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className={`bg-gradient-to-r ${item.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-2xl group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Nossos Valores */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h2 className="text-3xl text-center mb-4">Nossos Valores</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Princípios que guiam cada decisão e ação na plataforma Ami
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + (index * 0.1) }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className={`bg-gradient-to-br ${value.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recursos da Plataforma */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <h2 className="text-3xl text-center mb-4">Recursos da Plataforma</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Ferramentas poderosas para conectar, gerenciar e mensurar impacto social
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.6 + (index * 0.05) }}
              className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors group"
            >
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-brasil-green/10 to-brasil-blue/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-5 w-5 text-brasil-green" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="bg-gradient-to-r from-brasil-green/10 via-brasil-yellow/10 to-brasil-blue/10 p-8 rounded-2xl text-center border border-brasil-green/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <h2 className="text-2xl mb-4">Pronto para fazer a diferença?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Junte-se a centenas de voluntários que já estão transformando suas comunidades através de pequenas ações com grande impacto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              onClick={() => onNavigate('tasks')}
              className="bg-brasil-green hover:bg-brasil-green-dark"
            >
              Encontrar Oportunidades
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('for-orgs')}
              className="border-brasil-green/30 hover:bg-brasil-green/10"
            >
              Sou uma ONG
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

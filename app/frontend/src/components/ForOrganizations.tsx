import { motion } from 'motion/react';
import { 
  Building2, Users, Calendar, TrendingUp, Clock, Award, 
  Check, Heart, BarChart3, Mail, Shield, Sparkles,
  Target, Zap, Globe, MessageCircle, FileText, Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ForOrganizationsProps {
  onLogin: () => void;
}

export function ForOrganizations({ onLogin }: ForOrganizationsProps) {
  const benefits = [
    {
      icon: Users,
      title: 'Acesso a Voluntários Engajados',
      description: 'Conecte-se com centenas de voluntários prontos para fazer a diferença',
      color: 'from-brasil-green to-brasil-green-light'
    },
    {
      icon: Clock,
      title: 'Gestão Simplificada',
      description: 'Publique oportunidades em minutos e gerencie tudo em um só lugar',
      color: 'from-brasil-blue to-brasil-blue-light'
    },
    {
      icon: BarChart3,
      title: 'Relatórios de Impacto',
      description: 'Acompanhe métricas detalhadas e demonstre o impacto das suas ações',
      color: 'from-brasil-yellow to-brasil-yellow-light'
    },
    {
      icon: Shield,
      title: 'Ambiente Confiável',
      description: 'Plataforma segura com verificação de voluntários e organizações',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const features = [
    'Sistema de publicação intuitivo de oportunidades',
    'Gerenciamento automático de inscrições e confirmações',
    'Dashboard completo com estatísticas e analytics',
    'Comunicação direta com voluntários',
    'Emissão automática de certificados',
    'Sistema de avaliação e feedback',
    'Relatórios customizados de impacto',
    'Suporte técnico dedicado',
    'Ferramentas de divulgação integradas',
    'Histórico completo de atividades',
    'Perfil público personalizável',
    'Banco de dados de voluntários'
  ];

  const process = [
    {
      step: 1,
      title: 'Cadastre sua organização',
      description: 'Preencha um formulário simples com informações básicas da sua ONG',
      icon: FileText
    },
    {
      step: 2,
      title: 'Complete seu perfil',
      description: 'Adicione detalhes sobre sua missão, áreas de atuação e projetos',
      icon: Building2
    },
    {
      step: 3,
      title: 'Publique oportunidades',
      description: 'Crie atividades de micro-voluntariado e comece a receber inscrições',
      icon: Sparkles
    },
    {
      step: 4,
      title: 'Gerencie voluntários',
      description: 'Confirme participações, comunique-se e acompanhe o impacto gerado',
      icon: Target
    }
  ];

  const testimonials = [
    {
      organization: 'Instituto Verde Vida',
      name: 'Maria Santos',
      role: 'Coordenadora de Voluntariado',
      image: '🌱',
      text: 'O Ami transformou nossa forma de trabalhar com voluntários. Conseguimos triplicar nossa capacidade de realizar ações ambientais.',
      impact: '+200 voluntários conectados'
    },
    {
      organization: 'Fundação Esperança',
      name: 'João Silva',
      role: 'Diretor Executivo',
      image: '❤️',
      text: 'A plataforma nos ajudou a alcançar um público mais jovem e engajado. As ferramentas de gestão economizaram horas de trabalho.',
      impact: '150 famílias beneficiadas mensalmente'
    },
    {
      organization: 'Projeto Futuro',
      name: 'Ana Costa',
      role: 'Coordenadora Pedagógica',
      image: '📚',
      text: 'Encontramos profissionais qualificados para ministrar aulas e workshops. O impacto na comunidade é mensurável e transformador.',
      impact: '500+ jovens impactados'
    }
  ];

  const stats = [
    { value: '50+', label: 'ONGs Cadastradas', icon: Building2 },
    { value: '200+', label: 'Voluntários Ativos', icon: Users },
    { value: '1000+', label: 'Atividades Realizadas', icon: Calendar },
    { value: '5000+', label: 'Pessoas Impactadas', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brasil-blue/10 via-transparent to-brasil-green/10" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-brasil-blue/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brasil-green/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brasil-blue/10 to-brasil-green/10 backdrop-blur-sm border border-brasil-blue/20 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="h-4 w-4 text-brasil-blue" />
              <span className="text-sm bg-gradient-to-r from-brasil-blue via-brasil-green to-brasil-blue bg-clip-text text-transparent">
                Plataforma para Organizações Sociais
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl mb-6 max-w-4xl mx-auto">
              Amplifique o{' '}
              <span className="bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue bg-clip-text text-transparent">
                impacto
              </span>
              {' '}da sua organização
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Conecte-se com voluntários engajados, gerencie atividades com facilidade 
              e demonstre o impacto real das suas ações sociais.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={onLogin}
                className="gap-2 px-8 bg-gradient-to-r from-brasil-blue to-brasil-blue-light hover:from-brasil-blue-dark hover:to-brasil-blue shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Cadastrar minha organização
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-8 border-brasil-blue/30 hover:bg-brasil-blue/10"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="h-5 w-5" />
                Saber mais
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="bg-gradient-to-br from-brasil-blue/10 to-brasil-green/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-brasil-blue" />
                    </div>
                    <div className="text-2xl mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl mb-4">Por que escolher o Ami?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para facilitar o trabalho da sua organização
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-6">
                    <div className={`bg-gradient-to-br ${benefit.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl mb-4">Recursos e Funcionalidades</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar voluntários e maximizar seu impacto social
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-brasil-green" />
                </div>
                <p className="text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl mb-4">Como começar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Em 4 passos simples, sua organização estará conectada com voluntários
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 text-center">
                    <div className="relative mb-4">
                      <div className="bg-gradient-to-br from-brasil-blue to-brasil-green w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-brasil-yellow text-brasil-yellow-dark w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <Zap className="h-6 w-6 text-brasil-yellow-dark" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl mb-4">O que dizem as organizações</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de ONGs que transformaram sua gestão de voluntários
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.organization}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brasil-green/20 to-brasil-blue/20 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <h4>{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current text-brasil-yellow-dark" />
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="pt-3 border-t">
                      <p className="text-xs font-medium text-brasil-green">{testimonial.organization}</p>
                      <Badge variant="secondary" className="mt-2 bg-brasil-green/10 text-brasil-green border-brasil-green/20">
                        {testimonial.impact}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-brasil-blue/10 via-brasil-green/10 to-brasil-yellow/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-brasil-blue/20 shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="bg-gradient-to-br from-brasil-blue/20 to-brasil-green/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-brasil-blue" />
                </div>
                
                <h2 className="text-3xl mb-4">Pronto para começar?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Junte-se às dezenas de organizações que já estão transformando suas 
                  comunidades com o apoio da nossa plataforma. O cadastro é rápido, 
                  gratuito e você pode começar a publicar oportunidades hoje mesmo.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    onClick={onLogin}
                    className="gap-2 px-8 bg-gradient-to-r from-brasil-blue to-brasil-blue-light hover:from-brasil-blue-dark hover:to-brasil-blue shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Building2 className="h-5 w-5" />
                    Cadastrar organização
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8 border-brasil-blue/30 hover:bg-brasil-blue/10"
                    onClick={() => window.open('mailto:contato@ami.org.br', '_blank')}
                  >
                    <Mail className="h-5 w-5" />
                    Falar com nossa equipe
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Dúvidas? Entre em contato: <a href="mailto:contato@ami.org.br" className="text-brasil-blue hover:underline">contato@ami.org.br</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

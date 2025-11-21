import { motion } from 'motion/react';
import { ArrowRight, Clock, Users, Award, Sparkles, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface HeroSectionProps {
  onFindOpportunities: () => void;
  onForOrgs: () => void;
}

export function HeroSection({ onFindOpportunities, onForOrgs }: HeroSectionProps) {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Animated background elements with Brazilian colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-brasil-green/5 via-transparent to-brasil-blue/10" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-brasil-green/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brasil-yellow/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-brasil-blue/10 rounded-full blur-2xl animate-pulse delay-500" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brasil-green/10 to-brasil-blue/10 backdrop-blur-sm border border-brasil-green/20 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-brasil-green" />
            </motion.div>
            <span className="text-sm bg-gradient-to-r from-brasil-green via-brasil-blue to-brasil-green bg-clip-text text-transparent">
              Conectando comunidades brasileiras 🇧🇷
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl max-w-4xl mx-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforme algumas horas em{' '}
            <motion.span 
              className="bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              impacto real
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Conectamos amigos voluntários com oportunidades de impacto local. 
            Pequenas ações, grandes transformações na sua comunidade.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="gap-2 px-8 bg-gradient-to-r from-brasil-green to-brasil-green-light hover:from-brasil-green-dark hover:to-brasil-green shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onFindOpportunities}
            >
              Encontrar oportunidades
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 px-8 border-brasil-green/30 hover:bg-brasil-green/10 backdrop-blur-sm text-brasil-green hover:text-brasil-green-dark"
              onClick={onForOrgs}
            >
              <Building2 className="h-5 w-5" />
              Sou uma ONG
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Clock, value: '1-3h', label: 'Duração média das atividades', delay: 0.8, color: 'brasil-green' },
            { icon: Users, value: '200+', label: 'Voluntários ativos', delay: 1.0, color: 'brasil-blue' },
            { icon: Award, value: '50+', label: 'Organizações parceiras', delay: 1.2, color: 'brasil-yellow-dark' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
            >
              <Card className="text-center group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <motion.div 
                    className={`bg-gradient-to-br from-${stat.color}/10 to-${stat.color}/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h2 className="text-2xl mb-2">Como funciona</h2>
          <p className="text-muted-foreground mb-8">Simples, rápido e eficiente</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Encontre uma oportunidade',
                description: 'Navegue pelas atividades disponíveis e encontre algo que combine com você',
                delay: 1.6
              },
              {
                step: 2,
                title: 'Inscreva-se',
                description: 'Candidate-se com um clique. A organização irá confirmar sua participação',
                delay: 1.8
              },
              {
                step: 3,
                title: 'Faça a diferença',
                description: 'Participe da atividade e receba reconhecimento pelo seu impacto',
                delay: 2.0
              }
            ].map((item) => (
              <motion.div 
                key={item.step}
                className="flex flex-col items-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-brasil-green to-brasil-green-light text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="mb-2 group-hover:text-brasil-green transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
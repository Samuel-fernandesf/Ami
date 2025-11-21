import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, X, Heart, Calendar, Award, MessageCircle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Notification {
  id: string;
  type: 'opportunity' | 'confirmation' | 'badge' | 'message' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Nova oportunidade disponível',
    message: 'Uma oportunidade de limpeza de praia foi publicada perto de você!',
    time: '2 min atrás',
    read: false,
    actionable: true
  },
  {
    id: '2',
    type: 'confirmation',
    title: 'Participação confirmada',
    message: 'Sua participação na distribuição de alimentos foi confirmada para amanhã às 14h.',
    time: '1 hora atrás',
    read: false
  },
  {
    id: '3',
    type: 'badge',
    title: 'Nova conquista desbloqueada!',
    message: 'Parabéns! Você ganhou o badge "Voluntário Dedicado" por completar 5 atividades.',
    time: '2 horas atrás',
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'Mensagem da ONG Verde Vida',
    message: 'Obrigado pela sua participação! Sua ajuda fez a diferença.',
    time: '1 dia atrás',
    read: true
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Lembrete de atividade',
    message: 'Você tem uma atividade de ensino em 2 horas. Não se esqueça!',
    time: '2 dias atrás',
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'opportunity': return <Heart className="h-5 w-5 text-brasil-green" />;
    case 'confirmation': return <Check className="h-5 w-5 text-brasil-blue" />;
    case 'badge': return <Award className="h-5 w-5 text-brasil-yellow-dark" />;
    case 'message': return <MessageCircle className="h-5 w-5 text-brasil-blue-light" />;
    case 'reminder': return <Calendar className="h-5 w-5 text-brasil-green-light" />;
    default: return <Bell className="h-5 w-5" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'opportunity': return 'bg-brasil-green/10 border-brasil-green/20';
    case 'confirmation': return 'bg-brasil-blue/10 border-brasil-blue/20';
    case 'badge': return 'bg-brasil-yellow/20 border-brasil-yellow-dark/30';
    case 'message': return 'bg-brasil-blue-light/10 border-brasil-blue-light/20';
    case 'reminder': return 'bg-brasil-green-light/10 border-brasil-green-light/20';
    default: return 'bg-muted border-border';
  }
};

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brasil-green/20 to-brasil-blue/20 p-3 rounded-xl">
              <Bell className="h-6 w-6 text-brasil-green" />
            </div>
            <div>
              <h1 className="text-3xl">Notificações</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground">
                  {unreadCount} notificação{unreadCount !== 1 ? 'ões' : ''} não lida{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="border-brasil-green/30 hover:bg-brasil-green/10"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="all" className="gap-2">
              <Users className="h-4 w-4" />
              Todas ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              <Bell className="h-4 w-4" />
              Não lidas ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-4">
            <AnimatePresence>
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Nenhuma notificação</h3>
                  <p className="text-muted-foreground">
                    {filter === 'unread' ? 'Todas as suas notificações foram lidas!' : 'Você não tem notificações ainda.'}
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`${getNotificationColor(notification.type)} ${
                        !notification.read ? 'ring-2 ring-primary/20' : ''
                      } hover:shadow-md transition-all duration-200`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`${!notification.read ? 'font-semibold' : ''}`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                      Nova
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                              
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-8 w-8 p-0 hover:bg-primary/10"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {notification.actionable && (
                              <div className="mt-3 flex gap-2">
                                <Button size="sm" className="bg-brasil-green hover:bg-brasil-green-dark">
                                  Ver oportunidade
                                </Button>
                                <Button variant="outline" size="sm">
                                  Depois
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
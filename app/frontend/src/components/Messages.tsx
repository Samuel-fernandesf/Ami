import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, Send, Search, Filter, Paperclip, 
  MoreVertical, Star, Archive, Trash2, Heart,
  Building2, User, Clock, Check, CheckCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  conversationId: string;
  sender: {
    name: string;
    avatar?: string;
    type: 'volunteer' | 'organization';
  };
  content: string;
  timestamp: string;
  read: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar?: string;
    type: 'volunteer' | 'organization';
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  starred?: boolean;
  task?: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      name: 'Instituto Verde Vida',
      type: 'organization'
    },
    lastMessage: 'Obrigado pela sua participação! Você fez a diferença!',
    timestamp: '2 min atrás',
    unreadCount: 2,
    starred: true,
    task: 'Limpeza de Praia - Copacabana'
  },
  {
    id: '2',
    participant: {
      name: 'Fundação Esperança',
      type: 'organization'
    },
    lastMessage: 'Confirmo sua presença para amanhã às 14h. Até lá!',
    timestamp: '1 hora atrás',
    unreadCount: 0,
    task: 'Distribuição de Alimentos'
  },
  {
    id: '3',
    participant: {
      name: 'Projeto Futuro',
      type: 'organization'
    },
    lastMessage: 'Temos mais oportunidades para você! Interessado?',
    timestamp: '3 horas atrás',
    unreadCount: 1,
    task: 'Aula de Programação'
  },
  {
    id: '4',
    participant: {
      name: 'ONG Mãos que Ajudam',
      type: 'organization'
    },
    lastMessage: 'Sua inscrição foi aprovada! Vamos enviar mais detalhes.',
    timestamp: '1 dia atrás',
    unreadCount: 0,
    starred: true,
    task: 'Construção de Casas'
  },
  {
    id: '5',
    participant: {
      name: 'Centro Comunitário Vila Feliz',
      type: 'organization'
    },
    lastMessage: 'Adoraríamos ter você conosco novamente!',
    timestamp: '2 dias atrás',
    unreadCount: 0,
    task: 'Reforço Escolar'
  }
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: 'm1',
      conversationId: '1',
      sender: { name: 'Você', type: 'volunteer' },
      content: 'Olá! Vi a oportunidade de limpeza de praia e gostaria de participar.',
      timestamp: '10:30',
      read: true,
      status: 'read'
    },
    {
      id: 'm2',
      conversationId: '1',
      sender: { name: 'Instituto Verde Vida', type: 'organization' },
      content: 'Olá! Que ótimo ter você conosco! Sua inscrição foi aprovada. A atividade será no sábado às 8h na Praia de Copacabana.',
      timestamp: '10:45',
      read: true,
      status: 'delivered'
    },
    {
      id: 'm3',
      conversationId: '1',
      sender: { name: 'Você', type: 'volunteer' },
      content: 'Perfeito! Preciso levar algum material específico?',
      timestamp: '10:50',
      read: true,
      status: 'read'
    },
    {
      id: 'm4',
      conversationId: '1',
      sender: { name: 'Instituto Verde Vida', type: 'organization' },
      content: 'Nós fornecemos luvas, sacos e todo material necessário. Só pedimos que traga água e protetor solar! 😊',
      timestamp: '11:00',
      read: true,
      status: 'delivered'
    },
    {
      id: 'm5',
      conversationId: '1',
      sender: { name: 'Instituto Verde Vida', type: 'organization' },
      content: 'Obrigado pela sua participação! Você fez a diferença!',
      timestamp: 'Agora',
      read: false,
      status: 'delivered'
    }
  ],
  '2': [
    {
      id: 'm6',
      conversationId: '2',
      sender: { name: 'Fundação Esperança', type: 'organization' },
      content: 'Olá! Vimos seu interesse na distribuição de alimentos. Gostaríamos de confirmar sua participação.',
      timestamp: 'Ontem 15:20',
      read: true,
      status: 'delivered'
    },
    {
      id: 'm7',
      conversationId: '2',
      sender: { name: 'Você', type: 'volunteer' },
      content: 'Sim! Confirmo minha presença. Qual o endereço?',
      timestamp: 'Ontem 16:30',
      read: true,
      status: 'read'
    },
    {
      id: 'm8',
      conversationId: '2',
      sender: { name: 'Fundação Esperança', type: 'organization' },
      content: 'Confirmo sua presença para amanhã às 14h. Até lá!',
      timestamp: '1 hora atrás',
      read: true,
      status: 'delivered'
    }
  ]
};

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? conv.unreadCount > 0 :
      filter === 'starred' ? conv.starred : true;
    
    return matchesSearch && matchesFilter;
  });

  const currentMessages = selectedConversation ? mockMessages[selectedConversation] || [] : [];
  const currentConversation = mockConversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Em um app real, enviaria a mensagem
      console.log('Enviando mensagem:', messageText);
      setMessageText('');
    }
  };

  const totalUnread = mockConversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brasil-green/20 to-brasil-blue/20 p-3 rounded-xl">
              <MessageCircle className="h-6 w-6 text-brasil-green" />
            </div>
            <div>
              <h1 className="text-3xl">Mensagens</h1>
              {totalUnread > 0 && (
                <p className="text-muted-foreground">
                  {totalUnread} mensagem{totalUnread !== 1 ? 'ns' : ''} não lida{totalUnread !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
          {/* Lista de Conversas */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">
                      Não lidas
                      {totalUnread > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {totalUnread}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="starred" className="text-xs">
                      <Star className="h-3 w-3" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <CardContent className="p-2 space-y-1">
                <AnimatePresence>
                  {filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all hover:bg-muted/50 ${
                          selectedConversation === conversation.id
                            ? 'bg-brasil-green/10 border-l-2 border-brasil-green'
                            : conversation.unreadCount > 0
                            ? 'bg-primary/5'
                            : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-brasil-green/20 text-brasil-green">
                              {conversation.participant.type === 'organization' ? (
                                <Building2 className="h-5 w-5" />
                              ) : (
                                <User className="h-5 w-5" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}>
                                {conversation.participant.name}
                              </h4>
                              {conversation.starred && (
                                <Star className="h-3 w-3 fill-brasil-yellow text-brasil-yellow-dark flex-shrink-0" />
                              )}
                            </div>
                            
                            {conversation.task && (
                              <p className="text-xs text-muted-foreground mb-1 truncate">
                                {conversation.task}
                              </p>
                            )}
                            
                            <p className={`text-xs truncate ${
                              conversation.unreadCount > 0 
                                ? 'text-foreground font-medium' 
                                : 'text-muted-foreground'
                            }`}>
                              {conversation.lastMessage}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {conversation.timestamp}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brasil-green text-white text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredConversations.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma conversa encontrada</p>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>

          {/* Área de Chat */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation && currentConversation ? (
              <>
                {/* Header do Chat */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-brasil-green/20 text-brasil-green">
                          <Building2 className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{currentConversation.participant.name}</h3>
                        {currentConversation.task && (
                          <p className="text-xs text-muted-foreground">{currentConversation.task}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Star className={`h-4 w-4 ${currentConversation.starred ? 'fill-brasil-yellow text-brasil-yellow-dark' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Mensagens */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message, index) => {
                      const isCurrentUser = message.sender.type === 'volunteer';
                      
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end gap-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-brasil-green/20 text-brasil-green text-xs">
                                  <Building2 className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`space-y-1 ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                              <div
                                className={`rounded-2xl px-4 py-2 ${
                                  isCurrentUser
                                    ? 'bg-brasil-green text-white rounded-br-sm'
                                    : 'bg-muted rounded-bl-sm'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              
                              <div className={`flex items-center gap-1 text-xs text-muted-foreground ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <span>{message.timestamp}</span>
                                {isCurrentUser && message.status && (
                                  <span>
                                    {message.status === 'sent' && <Check className="h-3 w-3" />}
                                    {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                                    {message.status === 'read' && <CheckCheck className="h-3 w-3 text-brasil-blue" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Input de Mensagem */}
                <CardContent className="border-t pt-4">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] max-h-[120px] resize-none"
                    />
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-brasil-green hover:bg-brasil-green-dark flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground">
                    Escolha uma conversa da lista para começar a conversar
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

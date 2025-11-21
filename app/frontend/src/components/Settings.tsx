import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Palette, Moon, Sun, Volume2, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface SettingsData {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    newOpportunities: boolean;
    confirmations: boolean;
    reminders: boolean;
    messages: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    distance: number;
    categories: string[];
  };
}

export function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      bio: 'Voluntário apaixonado por transformar comunidades através de pequenas ações.'
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      newOpportunities: true,
      confirmations: true,
      reminders: true,
      messages: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      showLocation: true
    },
    preferences: {
      theme: 'system',
      language: 'pt-BR',
      distance: 10,
      categories: ['educacao', 'meio-ambiente', 'assistencia-social']
    }
  });

  const [activeTab, setActiveTab] = useState('profile');

  const updateSetting = (section: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-brasil-green/20 to-brasil-blue/20 p-3 rounded-xl">
            <SettingsIcon className="h-6 w-6 text-brasil-green" />
          </div>
          <div>
            <h1 className="text-3xl">Configurações</h1>
            <p className="text-muted-foreground">Personalize sua experiência no Ami</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacidade
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Palette className="h-4 w-4" />
              Preferências
            </TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) => updateSetting('profile', 'location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <textarea
                    id="bio"
                    className="w-full p-3 border rounded-md resize-none h-20"
                    value={settings.profile.bio}
                    onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
                    placeholder="Conte um pouco sobre você e sua motivação para ser voluntário..."
                  />
                </div>

                <Button onClick={handleSave} className="bg-brasil-green hover:bg-brasil-green-dark">
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Métodos de Notificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Push</Label>
                        <p className="text-sm text-muted-foreground">Notificações do navegador</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>SMS</Label>
                        <p className="text-sm text-muted-foreground">Mensagens de texto (opcional)</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Notificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'newOpportunities', label: 'Novas oportunidades', desc: 'Quando há novas atividades na sua área' },
                    { key: 'confirmations', label: 'Confirmações', desc: 'Quando sua participação é confirmada' },
                    { key: 'reminders', label: 'Lembretes', desc: 'Lembrar sobre atividades próximas' },
                    { key: 'messages', label: 'Mensagens', desc: 'Mensagens de organizações' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                        onCheckedChange={(checked) => updateSetting('notifications', item.key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacidade */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configurações de Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Perfil público</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que organizações vejam seu perfil
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => updateSetting('privacy', 'profileVisible', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4>Informações visíveis no perfil</h4>
                  
                  {[
                    { key: 'showEmail', label: 'Email', icon: Mail },
                    { key: 'showPhone', label: 'Telefone', icon: Volume2 },
                    { key: 'showLocation', label: 'Localização', icon: MapPin }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <Label>{item.label}</Label>
                      </div>
                      <Switch
                        checked={settings.privacy[item.key as keyof typeof settings.privacy] as boolean}
                        onCheckedChange={(checked) => updateSetting('privacy', item.key, checked)}
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleSave} className="bg-brasil-green hover:bg-brasil-green-dark">
                  Salvar configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferências */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select 
                      value={settings.preferences.theme} 
                      onValueChange={(value) => updateSetting('preferences', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Claro
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Escuro
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Sistema
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select 
                      value={settings.preferences.language} 
                      onValueChange={(value) => updateSetting('preferences', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filtros Padrão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Distância máxima (km)</Label>
                    <Input
                      type="number"
                      value={settings.preferences.distance}
                      onChange={(e) => updateSetting('preferences', 'distance', parseInt(e.target.value))}
                      min="1"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categorias de interesse</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Educação', 'Meio Ambiente', 'Assistência Social', 
                        'Saúde', 'Cultura', 'Esportes'
                      ].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
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
import { ArrowLeft, Calendar, Clock, MapPin, Users, Building2, Heart, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Task } from '../types';
import { mockCurrentUser, getApplicationsByTask } from '../lib/data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
}

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  const currentUser = mockCurrentUser;
  const applications = getApplicationsByTask(task.id);
  const isVolunteer = currentUser?.role === 'volunteer';
  const hasApplied = applications.some(app => app.volunteerId === currentUser?.id);
  const isUpcoming = task.date > new Date();
  const spotsRemaining = task.slots - applications.filter(app => app.status === 'approved').length;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleApply = () => {
    // In a real app, this would make an API call
    alert('Inscrição enviada! Aguarde a confirmação da organização.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar às oportunidades
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {task.image && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title and Organization */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={isUpcoming ? 'default' : 'secondary'}>
                  {isUpcoming ? 'Vagas abertas' : 'Encerrado'}
                </Badge>
                {hasApplied && (
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Inscrito
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl mb-4">{task.title}</h1>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Organizada por {task.organization.name}</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre esta oportunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{task.description}</p>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a organização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4>{task.organization.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {task.organization.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Contato:</span>
                    <span>{task.organization.contact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da atividade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">Data e hora</p>
                    <p className="text-sm text-muted-foreground">{formatDate(task.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">Duração</p>
                    <p className="text-sm text-muted-foreground">{task.durationHours} hora{task.durationHours !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">Local</p>
                    <p className="text-sm text-muted-foreground">{task.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">Vagas</p>
                    <p className="text-sm text-muted-foreground">
                      {spotsRemaining} de {task.slots} disponíveis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Section */}
            {isVolunteer && (
              <Card>
                <CardContent className="pt-6">
                  {hasApplied ? (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Você já se inscreveu nesta oportunidade. A organização entrará em contato em breve.
                      </AlertDescription>
                    </Alert>
                  ) : isUpcoming && spotsRemaining > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Pronto para fazer a diferença?
                        </p>
                      </div>
                      <Button onClick={handleApply} className="w-full gap-2">
                        <Heart className="h-4 w-4" />
                        Quero participar
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Ao se inscrever, você receberá mais informações por email
                      </p>
                    </div>
                  ) : spotsRemaining <= 0 ? (
                    <Alert>
                      <AlertDescription>
                        Esta oportunidade já atingiu o número máximo de voluntários.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        Esta oportunidade já foi encerrada.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {!currentUser && (
              <Card>
                <CardContent className="pt-6 text-center space-y-4">
                  <Heart className="h-8 w-8 text-primary mx-auto" />
                  <div>
                    <p className="mb-2">Faça login para se inscrever</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Crie uma conta gratuita e comece a fazer a diferença
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Criar conta</Button>
                    <Button variant="outline" className="w-full">Já tenho conta</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
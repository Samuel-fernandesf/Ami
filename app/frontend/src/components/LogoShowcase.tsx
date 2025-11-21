import { motion } from 'motion/react';
import { AmiLogo, AmiLogoSimple } from './AmiLogo';
import { AmiBrand, AmiBrandHorizontal } from './AmiBrand';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function LogoShowcase() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl mb-4">Sistema de Identidade Visual</h1>
          <p className="text-muted-foreground">
            Logos e marca do Ami - Conectando amigos voluntários brasileiros
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Logo Principal */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogo size="sm" />
                  <span className="text-xs text-muted-foreground">SM</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogo size="md" />
                  <span className="text-xs text-muted-foreground">MD</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogo size="lg" />
                  <span className="text-xs text-muted-foreground">LG</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogo size="xl" />
                  <span className="text-xs text-muted-foreground">XL</span>
                </div>
              </div>
              
              <div className="text-center py-4 border-t">
                <AmiLogo size="lg" animated={true} />
                <p className="text-sm text-muted-foreground mt-2">Versão animada</p>
              </div>
            </CardContent>
          </Card>

          {/* Logo Simplificado */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Simplificado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogoSimple size="sm" />
                  <span className="text-xs text-muted-foreground">SM</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogoSimple size="md" />
                  <span className="text-xs text-muted-foreground">MD</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogoSimple size="lg" />
                  <span className="text-xs text-muted-foreground">LG</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <AmiLogoSimple size="xl" />
                  <span className="text-xs text-muted-foreground">XL</span>
                </div>
              </div>
              
              <div className="text-center py-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Para uso em espaços menores ou onde simplicidade é necessária
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marca Completa */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Marca Completa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
              <div className="flex flex-col items-center space-y-4">
                <AmiBrand size="sm" />
                <span className="text-xs text-muted-foreground">Pequeno</span>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <AmiBrand size="md" />
                <span className="text-xs text-muted-foreground">Médio</span>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <AmiBrand size="lg" />
                <span className="text-xs text-muted-foreground">Grande</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marca Horizontal */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Marca Horizontal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 py-4">
              <div className="flex justify-center">
                <AmiBrandHorizontal size="sm" />
              </div>
              <div className="flex justify-center">
                <AmiBrandHorizontal size="md" />
              </div>
              <div className="flex justify-center">
                <AmiBrandHorizontal size="lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variações de Fundo */}
        <Card>
          <CardHeader>
            <CardTitle>Variações de Fundo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fundo claro */}
              <div className="bg-white p-8 rounded-lg border">
                <div className="text-center">
                  <AmiLogo size="lg" />
                  <p className="text-sm text-gray-600 mt-4">Fundo claro</p>
                </div>
              </div>

              {/* Fundo escuro */}
              <div className="bg-gray-900 p-8 rounded-lg">
                <div className="text-center">
                  <AmiLogo size="lg" />
                  <p className="text-sm text-gray-300 mt-4">Fundo escuro</p>
                </div>
              </div>

              {/* Fundo colorido brasileiro */}
              <div className="bg-gradient-to-br from-brasil-green/20 via-brasil-yellow/20 to-brasil-blue/20 p-8 rounded-lg">
                <div className="text-center">
                  <AmiLogo size="lg" />
                  <p className="text-sm text-gray-700 mt-4">Fundo brasileiro</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diretrizes de Uso */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle>Diretrizes de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 text-brasil-green">✓ Usar</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Logo principal para branding oficial</li>
                  <li>• Logo simplificado em espaços pequenos</li>
                  <li>• Marca completa em apresentações</li>
                  <li>• Marca horizontal em headers/footers</li>
                  <li>• Manter espaçamento adequado ao redor</li>
                  <li>• Usar sobre fundos com contraste adequado</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-destructive">✗ Não usar</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Alterar cores ou proporções</li>
                  <li>• Sobrepor texto ou elementos na logo</li>
                  <li>• Usar em fundos com baixo contraste</li>
                  <li>• Esticar ou comprimir a logo</li>
                  <li>• Adicionar efeitos ou sombras</li>
                  <li>• Remover elementos da composição</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
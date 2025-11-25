# AMI\_REQUISITOS.md

# Especificação de Requisitos do Sistema AMI

Este documento detalha os Requisitos Funcionais (RF) e Não Funcionais (RNF) do sistema AMI, conforme especificado no documento de engenharia de software do projeto [1].

---

## 1. Requisitos Funcionais (RF)

Os Requisitos Funcionais especificam os serviços e funcionalidades que o sistema deve fornecer aos usuários (Voluntários e Organizações).

### 1.1. Cadastro e Login

| ID | Descrição | Base |
| :--- | :--- | :--- |
| **RF001** | O sistema deve permitir o cadastro de um novo usuário (Voluntário) com coleta de: e-mail, senha, CPF, nome completo, cidade/comunidade, telefone e foto de perfil. | Usuário |
| **RF002** | O sistema deve solicitar a data de nascimento e validar que o usuário tenha no mínimo 18 anos para ter acesso à conta. | Usuário |
| **RF003** | O sistema deve permitir que usuários (Voluntário e Organizador) façam login utilizando o e-mail e senha cadastrados, e também deve permitir o *logout*. | Organização |
| **RF004** | Após o cadastro do usuário, o sistema deve solicitar confirmação de e-mail antes de ativar a conta. | Sistema |
| **RF005** | Após o cadastro da organização, o sistema deve validar se é uma instituição real antes de ativar a conta. | Sistema |

### 1.2. Gerenciamento de Perfil

| ID | Descrição | Base |
| :--- | :--- | :--- |
| **RF006** | O sistema deve permitir ao Voluntário editar seu perfil adicionando: habilidades, disponibilidade (dias/horários), e foto de perfil. | Voluntário, Habilidade |
| **RF007** | O sistema deve permitir à Organização complementar seu perfil com: descrição detalhada e atualização de contato e documento comprobatório de instituição. | Organização |
| **RF008** | O perfil de Voluntário deve exibir o total de horas de serviço concluídas (calculado a partir do Histórico). | Histórico |

### 1.3. Oportunidades e Inscrição

| ID | Descrição | Base |
| :--- | :--- | :--- |
| **RF009** | O sistema deve permitir que uma Organização aprovada crie uma nova Oportunidade, definindo: título, descrição, endereço/local, data/hora, duração (horas), número de vagas, requisitos/tags (habilidades necessárias). | Oportunidade |
| **RF010** | O sistema deve permitir ao Voluntário buscar e filtrar Oportunidades por comunidade, tags (habilidades), data/período e duração. | Oportunidade |
| **RF011** | O sistema deve permitir ao Voluntário se inscrever em uma Oportunidade. | Inscrição |
| **RF012** | O sistema deve permitir à Organização visualizar e gerenciar as inscrições, podendo Aprovar ou Recusar os Voluntários. | Inscrição |

### 1.4. Validação e Histórico de Serviço e Conquistas

| ID | Descrição | Base |
| :--- | :--- | :--- |
| **RF013** | O sistema deve permitir o registro de presença (*Check-in/Out*) do Voluntário na Oportunidade, preferencialmente por um código aleatório gerado pela Organização ou confirmação manual pelo organizador. | Registro de Presença |
| **RF014** | O sistema deve permitir que a Organização acesse o painel e confirme (valide) o serviço prestado pelo Voluntário, definindo as horas confirmadas no Histórico. | Histórico |
| **RF015** | O sistema deve exibir o Histórico de serviço, incluindo as horas, para o Voluntário. | Histórico |
| **RF016** | O sistema deve conceder conquistas automaticamente ao Voluntário baseado em marcos atingidos (ex: total de horas de serviço no Histórico). | Conquista |

### 1.5. Comunidade, Feedback e Notificações

| ID | Descrição | Base |
| :--- | :--- | :--- |
| **RF017** | O sistema deve possuir um *Feed/Mural Local* onde Voluntários e Organizações possam postar, interagir e comentar sobre ações e notícias da comunidade. | Comunidade, Post |
| **RF018** | O sistema deve permitir a *Avaliação Mútua* após a conclusão do serviço: o Voluntário avalia a Organização e vice-versa, com nota (1-5) e comentário. | Avaliação |
| **RF019** | O sistema deve enviar *Notificações* por e-mail e dentro da plataforma sobre: novas oportunidades (para Voluntários) e novas inscrições (para Organizações). | Notificação |

---

## 2. Requisitos Não Funcionais (RNF)

Os Requisitos Não Funcionais especificam os critérios de qualidade e as restrições que o sistema deve cumprir.

### 2.1. Desempenho e Licença

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF001** | O sistema deverá suportar, simultaneamente, muitos usuários (Voluntários e Organizadores). | Desempenho | Alta |
| **RNF002** | O sistema não pode apresentar diferenças de tempo de carregamento ou atraso na informação entre os usuários durante o uso do sistema, especialmente nas funções de comunidade. | Desempenho | Alta |
| **RNF003** | O sistema deve ser disponibilizado como Software Livre (Código Aberto), licenciando o código-fonte para uso e modificação. | Licença | Alta |

### 2.2. Usabilidade e Acessibilidade

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF004** | O sistema deve apresentar uma interface atraente e intuitiva, garantindo facilidade de uso tanto para usuários iniciantes quanto para experientes. | Usabilidade | Alta |
| **RNF005** | O sistema deve ser responsivo, garantindo usabilidade e funcionalidade completas em navegadores web de *desktop* e dispositivos móveis. | Portabilidade | Alta |
| **RNF006** | A interface deve utilizar formas e texturas (além de cores) para diferenciar os textos, para garantir a acessibilidade a usuários com deficiência visual (ex: daltonismo). | Acessibilidade | Média |
| **RNF007** | O sistema deve fornecer suporte a português (pt-BR) e possibilidade futura de adicionar outros idiomas. | Acessibilidade | Baixa |

### 2.3. Segurança e Privacidade

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF008** | Todas as senhas de usuário devem ser armazenadas utilizando criptografia *hash*. | Segurança | Alta |
| **RNF009** | O sistema deverá realizar um tratamento adequado dos dados pessoais (consentimento, política de privacidade, possibilidade de exclusão de conta). | Privacidade | Alta |

### 2.4. Arquitetura e Manutenção

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF010** | O sistema deve ser projetado para suportar um crescimento significativo na base de usuários e no volume de oportunidades sem degradação perceptível de desempenho. | Escalabilidade | Média |
| **RNF011** | O código-fonte do sistema ser limpo, bem documentado e gerenciado por controle de versão (GitHub), facilitando a manutenção eficiente. | Manutenção | Média |
| **RNF012** | O sistema deverá realizar *backups* periódicos do banco e plano de recuperação básica. | Backups | Média |

### 2.5. Ferramentas de Desenvolvimento

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF013** | O sistema deve ser desenvolvido utilizando a linguagem Python e o *framework* Flask para a implementação do *backend* (lógica de API). | Tecnologia | Alta |
| **RNF014** | A interface de usuário (*frontend*) deve ser desenvolvida utilizando a biblioteca React Vite.js para garantir modularidade. | Tecnologia | Alta |
| **RNF015** | O banco de dados para armazenamento persistente deve ser o SGBD MySQL junto da ORM SQLAlchemy e para comunicação em tempo real deve usar a biblioteca Flask-socketIO. | Tecnologia | Alta |

***

## Referências

[1] Especificação de Requisitos e Modelo de Dados - AMI.docx (Documento fornecido pelo usuário).

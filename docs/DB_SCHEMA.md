# DB_SCHEMA.md

# Modelo e Estrutura das Tabelas do Banco de Dados

Este documento detalha todas as tabelas do banco de dados do projeto AMI, utilizando-se de **MySQL** e **SQLAlchemy ORM** [2].

---

## Tabelas Principais

### `usuario` (Voluntários, Administradores e Responsáveis por Organizações)

Representa os usuários da plataforma, que podem ser voluntários ou administradores.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único do usuário. |
| `nome_completo` | String(100) | | | X | | | Nome completo do usuário. |
| `cpf` | String(11) | | | X | X | | Cadastro de Pessoa Física. |
| `email` | String(120) | | | X | X | | Email de login. |
| `senha` | String(255) | | | X | | | Senha (hash). |
| `cidade` | String(100) | | | X | | | Cidade de residência. |
| `bairro` | String(255) | | | X | | | Bairro de residência. |
| `telefone` | String(11) | | | X | | | Telefone de contato. |
| `data_nasc` | Date | | | X | | | Data de nascimento. |
| `foto_perfil` | String(255) | | | | | | Caminho para a foto de perfil. |
| `tipo_usuario` | String(50) | | | X | | "regular" | Tipo de usuário ("regular", "admin" ou "organizacao"). |
| `criado_em` | DateTime | | | | | current_timestamp() | Data de criação do registro. |
| `conta_ativa` | Boolean | | | | | True | Status da conta. |

### `organizacao`

Representa as organizações responsáveis pela criação de oportunidades de voluntariado.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único da organização. |
| `id_responsavel` | Integer | | X | X | | | FK para `usuario.id` (usuário responsável). |
| `razao_social` | String(1024) | | | X | | | Nome legal da organização. |
| `email_institucional` | String(120) | | | X | X | | Email institucional da organização. |
| `senha` | String(255) | | | X | | | Senha (hash) para login da organização. |
| `cnpj` | String(14) | | | X | X | | Cadastro Nacional da Pessoa Jurídica. |
| `descricao` | String(2048) | | | | | | Descrição da organização. |
| `endereco_matriz` | String(255) | | | X | | | Endereço principal. |
| `contato` | String(11) | | | X | | | Telefone de contato. |
| `documento` | String(255) | | | | | | Caminho para o documento de registro. |
| `foto_org` | String(255) | | | | | | Caminho para a foto da organização. |
| `criado_em` | DateTime | | | | | current_timestamp() | Data de criação do registro. |
| `aprovada` | Enum | | | X | | "pendente" | Status de aprovação da organização ("pendente", "aprovada", "rejeitada"). |

### `oportunidade`

Detalhes sobre as oportunidades de voluntariado publicadas pelas organizações.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único da oportunidade. |
| `id_organizacao` | Integer | | X | X | | | FK para `organizacao.id`. |
| `titulo` | String(255) | | | X | | | Título da oportunidade. |
| `descricao` | String(2048) | | | X | | | Descrição detalhada. |
| `local_endereco` | String(255) | | | X | | | Endereço do local da atividade. |
| `comunidade` | String(255) | | | X | | | Comunidade/Bairro onde a atividade ocorrerá. |
| `data_hora` | DateTime | | | X | | | Data e hora da atividade. |
| `duracao_horas` | Integer | | | X | | | Duração estimada em horas. |
| `num_vagas` | Integer | | | X | | | Número de vagas disponíveis. |
| `foto_local` | String(255) | | | | | | Caminho para a foto do local. |
| `tags` | String(512) | | | | | | Tags de categorização (string serializada). |
| `status` | Enum | | | X | | "aberta" | Status da oportunidade ("aberta", "fechada", "cancelada"). |
| `criado_em` | DateTime | | | | | current_timestamp() | Data de criação do registro. |

### `habilidade`

Lista de habilidades que podem ser associadas a voluntários e oportunidades.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único da habilidade. |
| `nome` | String(100) | | | X | X | | Nome da habilidade (ex: "Comunicação", "Organização"). |

### `inscricao`

Registro da inscrição de um voluntário em uma oportunidade.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único da inscrição. |
| `id_usuario` | Integer | | X | X | | | FK para `usuario.id` (voluntário). |
| `id_oportunidade` | Integer | | X | X | | | FK para `oportunidade.id`. |
| `data_inscricao` | DateTime | | | | | current_timestamp() | Data da inscrição. |
| `status_inscricao` | Enum | | | X | | "pendente" | Status da inscrição ("pendente", "aprovado", "rejeitado"). |
| `data_aprovacao_recusa` | DateTime | | | | | | Data de aprovação ou recusa. |

### `registro_presenca`
Registro de presença do voluntário na atividade.
| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único do registro. |
| `id_inscricao` | Integer | | X | X | X | | FK para `inscricao.id` (1:1). |
| `codigo_validacao_pin` | String(100) | | | X | | | PIN ou código para validação de presença. |
| `check_in_hora` | DateTime | | | | | current_timestamp() | Hora do check-in. |
| `check_out_hora` | DateTime | | | | | | Hora do check-out (opcional). |
### `historico_servico`
Registro de validação e histórico de serviço prestado pela Organização.
| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único do histórico. |
| `id_inscricao` | Integer | | X | X | X | | FK para `inscricao.id` (1:1). |
| `horas_confirmadas` | Integer | | | X | | | Horas de serviço confirmadas. |
| `data_validacao` | DateTime | | | X | | current_timestamp() | Data em que a Organização validou o serviço. |
| `certificado_url` | String(255) | | | | | | URL do certificado gerado. |
---
## Tabelas de Relacionamento (M:N)

Registro de presença do voluntário na atividade.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único do registro. |
| `id_inscricao` | Integer | | X | X | X | | FK para `inscricao.id` (1:1). |
| `codigo_validacao_pin` | String(100) | | | X | | | PIN ou código para validação de presença. |
| `check_in_hora` | DateTime | | | | | current_timestamp() | Hora do check-in. |
| `check_out_hora` | DateTime | | | | | | Hora do check-out (opcional). |

---

## Tabelas de Relacionamento (M:N)

### `voluntario_habilidade`

Associa voluntários a habilidades.

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único. |
| `id_usuario` | Integer | | X | X | X (com `id_habilidade`) | | FK para `usuario.id`. |
| `id_habilidade` | Integer | | X | X | X (com `id_usuario`) | | FK para `habilidade.id`. |

### `oportunidade_habilidade`

Associa oportunidades a habilidades (requisitos).

| Coluna | Tipo | PK | FK | Not Null | Unique | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | Integer | X | | X | | auto_inc | Identificador único. |
| `id_oportunidade` | Integer | | X | X | X (com `id_habilidade`) | | FK para `oportunidade.id`. |
| `id_habilidade` | Integer | | X | X | X (com `id_oportunidade`) | | FK para `habilidade.id`. |

---

## Relacionamentos

| Tabela Origem | Coluna Origem | Tabela Destino | Coluna Destino | Tipo de Relacionamento |
| :--- | :--- | :--- | :--- | :--- |
| `organizacao` | `id_responsavel` | `usuario` | `id` | N:1 |
| `oportunidade` | `id_organizacao` | `organizacao` | `id` | N:1 |
| `inscricao` | `id_usuario` | `usuario` | `id` | N:1 |
| `inscricao` | `id_oportunidade` | `oportunidade` | `id` | N:1 |
| `registro_presenca` | `id_inscricao` | `inscricao` | `id` | 1:1 |
| `historico_servico` | `id_inscricao` | `inscricao` | `id` | 1:1 |
| `voluntario_habilidade` | `id_usuario` | `usuario` | `id` | N:1 (M:N via tabela intermediária) |
| `voluntario_habilidade` | `id_habilidade` | `habilidade` | `id` | N:1 (M:N via tabela intermediária) |
| `oportunidade_habilidade` | `id_oportunidade` | `oportunidade` | `id` | N:1 (M:N via tabela intermediária) |
| `oportunidade_habilidade` | `id_habilidade` | `habilidade` | `id` | N:1 (M:N via tabela intermediária) |

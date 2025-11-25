# API\_ENDPOINTS.md

# Endpoints da API

O *backend* do AMI é construído com **Flask** e expõe uma API RESTful para todas as operações do sistema.

Ao rodar o *backend* com `flask run`, a API estará disponível em `http://127.0.0.1:5000`.

**Dicas:**

*   **Autenticação:** Todas as rotas protegidas exigem o *header*: `Authorization: Bearer <token>`.
*   **Token:** O token é obtido via `POST /auth/login`.
*   **Respostas:** Respostas negativas seguirão com um código HTTP e uma descrição do problema na chave `error`.

---

## Índice

*   [Autenticação](#autenticação)
*   [Usuários (Voluntários)](#usuários-voluntários)
*   [Organizações](#organizações)
*   [Oportunidades](#oportunidades)
*   [Inscrições](#inscrições)
*   [Habilidades](#habilidades)

---

## Autenticação

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Autentica um usuário (voluntário ou organização), retorna token JWT e dados do usuário. | Não |

### `POST /auth/login`

**Corpo da Requisição:**

```js
{
  "email": "email@example.com",
  "senha": "password"
}
```

**Resposta Esperada (Sucesso):**

```js
{
  "token": "token-jwt-aqui",
  "user": {
    "id": 1,
    "nome_completo": "Nome do Usuário",
    "email": "email@example.com",
    "tipo_usuario": "regular"
    // ... outros campos do usuário, exceto a senha
  }
}
```

---

## Usuários (Voluntários)

Rotas relacionadas ao CRUD de usuários voluntários.

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/` | Cria um novo usuário voluntário. | Não |
| `GET` | `/users/` | Lista todos os usuários (Admin/Todos). | Não |
| `GET` | `/users/<int:user_id>` | Busca usuário por ID. | Não |
| `GET` | `/users/email/<string:email>` | Busca usuário por email. | Não |
| `GET` | `/users/telefone/<string:telefone>` | Busca usuário por telefone. | Não |
| `GET` | `/users/<int:user_id>/habilidades` | Lista as habilidades de um usuário. | Não |
| `GET` | `/users/admins` | Lista todos os usuários administradores. | Não |
| `PUT` | `/users/<int:user_id>` | Atualiza dados do usuário. | Sim |
| `DELETE` | `/users/<int:user_id>` | Remove usuário. | Sim |

### `POST /users/`

**Corpo da Requisição:**

```js
{
  "nome_completo": "Nome Completo",
  "cpf": "12345678900",
  "email": "novo@usuario.com",
  "senha": "senha_segura",
  "cidade": "Cidade Exemplo",
  "bairro": "Bairro Exemplo",
  "telefone": "11987654321",
  "data_nasc": "01-01-2000", // Formato DD-MM-YYYY
  "habilidades": ["Comunicação", "Liderança"], // Lista de nomes de habilidades
  "foto_perfil_PATH": "data:image/png;base64,..." // Imagem em Base64
}
```

---

## Organizações

Rotas relacionadas ao CRUD de organizações.

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/organizacoes` | Cria uma nova organização. | Não |
| `GET` | `/organizacoes` | Lista todas as organizações. | Não |
| `GET` | `/organizacoes/<int:organizacao_id>` | Busca organização por ID. | Não |
| `GET` | `/organizacoes/email/<string:email_institucional>` | Busca organização por email. | Não |
| `GET` | `/organizacoes/cnpj/<string:cnpj_id>` | Busca organização por CNPJ. | Não |
| `PUT` | `/organizacoes/<int:organizacao_id>` | Atualiza dados da organização. | Sim |
| `DELETE` | `/organizacoes/<int:organizacao_id>` | Remove organização. | Sim |

### `POST /organizacoes`

**Corpo da Requisição:**

```js
{
  "id_responsavel": 1, // ID do usuário que está cadastrando a organização
  "razao_social": "ONG Exemplo Social",
  "email_institucional": "contato@ongexemplo.org",
  "senha": "senha_segura",
  "cnpj_id": "12345678000190",
  "descricao": "Descrição da ONG.",
  "endereco_matriz": "Rua Exemplo, 123",
  "contato": "11987654321",
  "documento": "Caminho/para/documento.pdf" // O campo 'documento' no código é opcional
}
```

---

## Oportunidades

Rotas relacionadas ao CRUD de oportunidades de voluntariado.

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/oportunidade/` | Cria uma nova oportunidade. | Sim (Organização/Admin) |
| `GET` | `/oportunidade/` | Lista todas as oportunidades. | Não |
| `GET` | `/oportunidade/<int:id_oportunidade>` | Busca oportunidade por ID. | Não |
| `GET` | `/oportunidade/organizacao/<int:id_organizacao>` | Lista oportunidades de uma organização. | Não |
| `PUT` | `/oportunidade/<int:id_oportunidade>` | Atualiza oportunidade. | Sim (Dono/Admin) |
| `DELETE` | `/oportunidade/<int:id_oportunidade>` | Remove oportunidade. | Sim (Dono/Admin) |

### `POST /oportunidade/`

**Corpo da Requisição:**

```js
{
  "titulo": "Mutirão de Limpeza",
  "descricao": "Ajuda na limpeza de um parque local.",
  "local_endereco": "Parque da Cidade, Setor 1",
  "comunidade": "Bairro Central",
  "data_hora": "2025-12-10T10:00:00", // Formato ISO8601
  "duracao_horas": 3,
  "num_vagas": 20,
  "requisitos": "Trazer luvas e disposição.",
  "tags": "Meio Ambiente, Limpeza",
  "habilidades": ["Trabalho em Equipe", "Organização"] // Lista de nomes de habilidades
}
```

---

## Inscrições

Rotas relacionadas ao gerenciamento de inscrições de voluntários em oportunidades.

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/inscricao/` | Cria uma nova inscrição. | Sim |
| `GET` | `/inscricao/` | Lista todas as inscrições (Admin) ou as próprias (Voluntário). | Sim |
| `GET` | `/inscricao/<int:id_inscricao>` | Busca inscrição por ID. | Sim |
| `GET` | `/inscricao/oportunidade/<int:id_oportunidade>` | Lista inscrições para uma oportunidade. | Sim (Admin) |
| `PUT` | `/inscricao/<int:id_inscricao>` | Atualiza status da inscrição (Admin) ou outros dados (Voluntário). | Sim |
| `DELETE` | `/inscricao/<int:id_inscricao>` | Remove inscrição. | Sim |

### `PUT /inscricao/<int:id_inscricao>`

**Corpo da Requisição (Admin):**

```js
{
  "status_inscricao": "aprovado" // ou "rejeitado"
}
```

---

## Habilidades

Rotas relacionadas ao CRUD de habilidades.

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/habilidade/` | Cria uma nova habilidade. | Não |
| `GET` | `/habilidade/` | Lista todas as habilidades. | Não |
| `GET` | `/habilidade/<int:habilidade_id>` | Busca habilidade por ID. | Não |
| `GET` | `/habilidade/nome/<string:nome>` | Busca habilidade por nome. | Não |
| `GET` | `/habilidade/usuario/<int:user_id>` | Lista habilidades de um usuário. | Não |
| `GET` | `/habilidade/oportunidade/<int:oportunidade_id>` | Lista habilidades de uma oportunidade. | Não |
| `GET` | `/habilidade/exists/<string:nome>` | Verifica se uma habilidade existe. | Não |
| `PUT` | `/habilidade/<int:habilidade_id>` | Atualiza nome da habilidade. | Não |
| `DELETE` | `/habilidade/<int:habilidade_id>` | Remove habilidade. | Não |

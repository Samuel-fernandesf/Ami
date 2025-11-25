# AMI – Conectando o Futuro

<p align="center" display="inline-block">
  <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img-shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

**AMI** é uma plataforma de **inovação e tecnologia social** desenvolvida para conectar jovens a oportunidades de **voluntariado local e microtarefas comunitárias** [1]. O projeto visa tornar o engajamento cívico mais acessível, rápido e significativo, fortalecendo laços comunitários e incentivando o protagonismo juvenil.

---

## Índice

*   [Objetivo do Projeto](#objetivo-do-projeto)
*   [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
*   [Funcionalidades Principais](#funcionalidades-principais)
*   [Documentação Detalhada](#documentação-detalhada)
    *   [Especificação de Requisitos](#especificação-de-requisitos)
    *   [Endpoints da API (Backend)](#endpoints-da-api-backend)
    *   [Esquema do Banco de Dados](#esquema-do-banco-de-dados)
*   [Instalação e Execução](#instalação-e-execução)
*   [Licença](#licença)

---

## Objetivo do Projeto

O principal objetivo do AMI é facilitar a conexão entre **ONGs e/ou instituições locais e jovens voluntários**, criando um espaço digital para divulgar ações sociais curtas (1–3 horas) [1].

**Principais metas:**

*   Tornar o voluntariado mais acessível e flexível.
*   Criar um histórico digital de ações voluntárias.
*   Reconhecer o engajamento dos jovens com selos e *badges*.
*   Fortalecer laços comunitários e impacto social local.

---

## Arquitetura e Tecnologias

O AMI adota uma arquitetura de aplicação web moderna, dividida em *backend* e *frontend* [2].

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | Python (Flask) | Responsável pela lógica de negócios, autenticação, e exposição da API REST. |
| **Banco de Dados** | MySQL + SQLAlchemy | Utilizado para persistência de dados, com SQLAlchemy como ORM para mapeamento objeto-relacional. |
| **Frontend** | React + Vite | Interface de usuário desenvolvida com React para uma experiência dinâmica e rápida, utilizando Vite para *bundling*. |
| **Autenticação** | JWT (JSON Web Tokens) | Utilizado para autenticação segura e controle de acesso às rotas protegidas da API. |

---

## Funcionalidades Principais

O sistema AMI suporta as seguintes funcionalidades principais, que se alinham com o objetivo de conectar voluntários e organizações [1]:

| Módulo | Funcionalidades |
| :--- | :--- |
| **Usuários** | Cadastro e autenticação de usuários (voluntários e organizações). |
| **Oportunidades** | Publicação, busca e filtros de oportunidades de voluntariado por comunidade, tipo de ação e tempo disponível. |
| **Inscrições** | Inscrição de voluntários em atividades e confirmação de participação. |
| **Presença** | Registro de presença (*check-in*) em atividades (mencionado no `inscricao.py` via `RegistroPresenca`). |
| **Habilidades** | Gerenciamento de habilidades de voluntários e requisitos de oportunidades. |
| **Histórico** | Histórico de ações e sistema de *badges* (mencionado no `README.md` original). |

---

## Documentação Detalhada

Para detalhes técnicos aprofundados, consulte os documentos dedicados:

### Especificação de Requisitos
Requisitos Funcionais e Não Funcionais do sistema estão detalhados em:

> [**AMI\_REQUISITOS.md**](./docs/AMI_REQUISITOS.md)

### Endpoints da API (Backend)

O *backend* expõe uma API RESTful para todas as operações do sistema. Detalhes sobre rotas, métodos HTTP, corpos de requisição e respostas estão disponíveis em:

> [**API\_ENDPOINTS.md**](./docs/API_ENDPOINTS.md)

### Esquema do Banco de Dados

O modelo de dados, incluindo tabelas, colunas, tipos e relacionamentos, é detalhado em:

> [**DB\_SCHEMA.md**](./docs/DB_SCHEMA.md)

---

## Instalação e Execução

O projeto é dividido em *backend* (Python/Flask) e *frontend* (React/Vite).

### Pré-requisitos

*   Python 3.12+
*   MySQL 8.0+
*   Node.js 18+
*   Git

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Samuel-fernandesf/Ami.git
    cd Ami
    ```

2.  **Configuração do Backend (API)**
    *   Instale as dependências:
        ```bash
        cd app/backend
        python3 -m venv venv
        source venv/bin/activate  # Linux/MacOS
        # ./venv/scripts/Activate.ps1  # Windows
        pip install -r requirements.txt
        ```
    *   Configure o banco de dados:
        *   Crie a base de dados `ami` no MySQL: `CREATE DATABASE ami;`
        *   Renomeie `.env.example` para `.env` e configure `SECRET_KEY` e `DATABASE_URL`.
        *   Execute as migrações: `flask db upgrade`

3.  **Configuração do Frontend (Web)**
    *   Instale as dependências:
        ```bash
        cd ../frontend
        npm install
        ```

4.  **Execução do Projeto**
    *   **Backend:** Na pasta `app/backend`, com o ambiente virtual ativado, execute:
        ```bash
        flask run
        # Disponível em http://127.0.0.1:5000
        ```
    *   **Frontend:** Na pasta `app/frontend`, execute:
        ```bash
        npm run dev
        # Disponível em http://127.0.0.1:5173
        ```

---

## Licença

Este projeto é distribuído sob a licença **MIT** [1].

***

## Referências

[1] [Samuel-fernandesf/Ami - README.md](https://github.com/Samuel-fernandesf/Ami)
[2] Análise da estrutura de diretórios do repositório Ami.\n[3] Diagrama Lógico-Relacional v.1.0.png (Documento fornecido pelo usuário).

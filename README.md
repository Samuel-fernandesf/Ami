# AMI – Conectando o Futuro

<p align="center" display="inline-block">
  <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white"/>
</p>


**AMI** é uma plataforma de **inovação e tecnologia social** que conecta jovens a oportunidades de **voluntariado local e microtarefas comunitárias**.  
O projeto foi desenvolvido como parte da disciplina de **Inovação e Tecnologia Social** do Instituto Federal, com o objetivo de tornar o engajamento cívico mais acessível, rápido e significativo.

---

## Índice 
- [Objetivo do Projeto](#objetivo-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação]()
- [Rodando o Projeto]()
- [Equipe](#equipe)
- [Metodologia](#metodologia)
- [Trabalhos Relacionados](#trabalhos-relacionados)
- [Licença](#licença)



## Objetivo do Projeto

Facilitar a conexão entre **ONGs e/ou instituições locais e jovens voluntários**, criando um espaço digital para divulgar ações sociais curtas (1–3 horas) e incentivar o protagonismo juvenil.

**Principais metas:**
- Tornar o voluntariado mais acessível e flexível.
- Criar um histórico digital de ações voluntárias.
- Reconhecer o engajamento dos jovens com selos e badges.
- Fortalecer laços comunitários e impacto social local.

---

## Funcionalidades Principais

- Cadastro e autenticação de usuários (voluntários e organizações).  
- Publicação de oportunidades de voluntariado.  
- Busca e filtros por comunidade, tipo de ação e tempo disponível.  
- Inscrição e confirmação em atividades.  
- Registro de presença (check-in) via QR code.  
- Histórico e sistema de badges.  
- Painel administrativo para moderação e relatórios.  
- Notificações e mural comunitário.

---

## Tecnologias Utilizadas

| Camada | Ferramenta |
|--------|-------------|
| **Backend** | Python (Flask) |
| **Frontend** | React + Vite |
| **Banco de Dados** | MySQL + SQLAlchemy |
| **Prototipação** | [Figma](https://www.figma.com/make/6G077fFrGAR3Ava8mbK2dj/Ami---Conectando-jovens--moldando-o-futuro?node-id=0-1&p=f&t=Lw8g1gABCKEl7a5J-0) |
| **Controle de Versão** | Git / GitHub |
| **Outros** | HTML5, CSS3, JWT, Flask-WTF |


---

## Instalação

### **Pré-requisitos**

- Python 3.12+
- MySQL 8.0+
- Node.js 18+
- Git


### Passo a Passo

1. **Clone o repositório:**
```bash
  git clone https://github.com/Samuel-fernandesf/Ami.git
  cd AMI
```   

2. **Instale as dependências do backend:**
```bash
  cd app/backend
  python3 -m venv venv
  
  # Linux/MacOS
  source venv/bin/activate

  # Windows
  ./venv/scripts/Activate.ps1

  pip install -r requirements.txt  
```  

3. **Configure o Ambiente Virtual**

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:
```python
  SECRET_KEY="sua_chave_secreta_aqui"
  DATABASE_URL="mysql://{usuário}:{senha}@localhost:3306/ami"
```

3. **Configure o Banco de Dados**

Primeiro crie **com o MySQL** uma base de dados de nome `ami`:
```sql
  CREATE DATABASE ami;
```

Após isso, na pasta do backend execute
```bash
  flask db upgrade
```

### Instalando o FrontEnd

1. **Instale as dependências do frontend:**
```bash
  cd ../frontend
  npm install
```

## Rodando o Projeto

### **Rodando o Backend**

Na pasta `app/backend`, com o ambiente virtual ativado, execute:
```bash
  flask run
```
O backend estará disponível em [http://127.0.0.1:5000](http://127.0.0.1:5000)


### **Rodando o Frontend**
Na pasta `app/frontend`, execute:
```bash
  npm run dev
```
O frontend estará disponível em [http://127.0.0.1:5173](http://127.0.0.1:5173)







##  Equipe

- **Bernardo Duarte Marcelino** - Estudante de TI (Instituto Federal)
- **Luiz Gabriel Leli** — Estudante de TI (Instituto Federal)  
- **Marco Gramari** - Estudante de TI (Instituto Federal)
- **Samuel Fernandes Filho** - Estudante de TI (Instituto Federal)
- **Yagor Vitor Silva dos Santos** - Estudante de TI (Instituto Federal)  

---

## Metodologia

O projeto adota uma abordagem **socio-técnica**, integrando:
- **Design centrado no usuário** — escuta ativa de jovens e ONGs locais.  
- **Desenvolvimento iterativo** — prototipagem rápida e validação contínua.  
- **Tecnologia social** — soluções digitais que respondem a demandas reais da comunidade.  

---

##  Trabalhos Relacionados

- ATADOS. *Atados: rede social de voluntariado.* Disponível em: <https://www.atados.com.br/>.  
- UNITED NATIONS. *UN Online Volunteering.* Disponível em: <https://www.onlinevolunteering.org/>.  

---

## Licença

Este projeto é de caráter **educacional e social**, sem fins lucrativos.  
Distribuído sob a licença **MIT** — sinta-se à vontade para estudar, adaptar e contribuir.

---

> *"Transformando boas intenções em ações reais — um voluntário por vez."* 🌱

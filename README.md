# Gym Prive - Backend 🏋️‍♂️

Este é o backend do sistema Gym Prive, desenvolvido com **Node.js** e **Sequelize** para gerenciamento de treinos. Ele se conecta a um banco de dados **PostgreSQL**.

## 🚀 **Instalação e Configuração**
Siga os passos abaixo para configurar e rodar o backend localmente.

### **1️⃣ Pré-requisitos**
Antes de começar, instale as seguintes dependências:
- [Node.js (LTS)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [pgAdmin (Opcional)](https://www.pgadmin.org/)

### **2️⃣ Clonar o repositório**
```sh
git clone https://github.com/seu-usuario/gym-prive-backend.git
cd gym-prive-backend

🗄️ 1.3 Configuração do Banco de Dados
Caso o banco de dados ainda não esteja criado, utilize o pgAdmin ou rode os comandos abaixo no terminal do PostgreSQL:
CREATE DATABASE gymprive;

Agora, rode as migrações para criar as tabelas:
npx sequelize db:migrate

⚙️ 1.4 Configuração das Variáveis de Ambiente
Crie um arquivo .env dentro da pasta gym-prive-backend e adicione:
DB_NAME=gymprive
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
PORT=3001
JWT_SECRET=sua_chave_secreta

📦 1.5 Instalar dependências
npm install

▶️ 1.6 Iniciar o backend
npm start
O backend estará rodando em http://localhost:3001.

🛠 Tecnologias Utilizadas
Backend: Node.js, Express.js, Sequelize, PostgreSQL, JWT para autenticação

Agora o projeto está pronto para ser executado localmente! 🚀🔥

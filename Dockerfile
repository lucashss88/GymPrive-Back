# Usar imagem Node.js como base
FROM node:18

# Instalar dependências necessárias para compilar pacotes nativos
RUN apt-get update && apt-get install -y python3 make g++

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar as dependências do projeto, compilando pacotes nativos se necessário
RUN npm install --build-from-source

# Expor a porta em que o servidor vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]


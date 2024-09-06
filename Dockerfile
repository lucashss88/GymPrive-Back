# Usar a imagem Node.js como base
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Expor a porta em que o servidor vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]


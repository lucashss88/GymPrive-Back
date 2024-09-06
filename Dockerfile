FROM node:18

# Instale dependências para build do bcrypt
RUN apt-get update && apt-get install -y python3 make g++ 

WORKDIR /app

COPY . .

RUN npm install

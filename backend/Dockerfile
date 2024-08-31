# Use a imagem oficial do Node.js 20 como base
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Compile o TypeScript para JavaScript
RUN npx tsc

# Exponha a porta que a aplicação vai rodar
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]

FROM node:20

WORKDIR /api

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install --verbose

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3333

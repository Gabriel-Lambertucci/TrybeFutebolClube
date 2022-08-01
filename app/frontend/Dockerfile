FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json .

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]
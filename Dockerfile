FROM node:14-alpine

WORKDIR /node-api

COPY package.json .

RUN ["npm", "install"]

COPY . .

CMD ["node", "./src/server.js"]

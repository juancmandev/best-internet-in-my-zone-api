FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE $PORT
CMD [ "npm", "start" ]
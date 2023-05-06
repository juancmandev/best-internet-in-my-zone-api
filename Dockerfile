FROM node:16.16.0-alpine

WORKDIR /usr/app

COPY . .

EXPOSE $PORT

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]

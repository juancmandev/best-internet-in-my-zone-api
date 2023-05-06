FROM node:16.16.0-alpine

WORKDIR /usr/app

COPY . .

EXPOSE $PORT

RUN npm i -g npm@8.19.2
RUN npm ci --only=production
RUN npm install typescript


RUN npm run build

CMD [ "npm", "start" ]

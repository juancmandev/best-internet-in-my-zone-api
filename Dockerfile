FROM node:16.16.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD ["npm","start"]
FROM node:16

WORKDIR /app

COPY package.json .

RUN npm i

COPY . . 

FROM dependencies as builder

RUN npm run build

EXPOSE $PORT

CMD npm run start
FROM node:alpine

RUN apk add --no-cache postgresql-client

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
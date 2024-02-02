FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --immutable --network-timeout 300000

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
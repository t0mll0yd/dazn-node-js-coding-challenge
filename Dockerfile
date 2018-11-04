FROM node:11.0.0

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

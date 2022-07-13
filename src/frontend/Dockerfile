FROM node:16

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD "yarn" "run" "start"

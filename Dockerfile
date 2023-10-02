FROM node:alpine

WORKDIR /var/www/myapp

COPY . .

RUN npm i

EXPOSE 9000

CMD ["npm","start"]                 
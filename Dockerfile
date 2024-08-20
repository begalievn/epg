FROM node:18.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./start.sh

CMD ["sh", "-c", "npm run api-load && ./start.sh"]

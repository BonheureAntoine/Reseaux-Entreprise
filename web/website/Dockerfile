FROM node:21.1.0 as base
RUN apt update && apt upgrade -y

WORKDIR /app

COPY app/package*.json ./

RUN npm install

RUN npm i sharp

COPY ./app .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

FROM node:21.1.0 as base
RUN apt update && apt upgrade -y

WORKDIR /app

COPY app/package*.json ./

COPY ./app .

RUN npm install

RUN npm i sharp

# COPY ./entrypoint.sh ./entrypoint.sh
# RUN chmod +x ./entrypoint.sh

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "npm", "run", "start"]

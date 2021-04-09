FROM 14.16.1-alpine as production

WORKDIR /usr/src/graph-service

COPY package*.json ./

RUN npm install --only=production

COPY /usr/src/graph-service/dist ./dist

EXPOSE 3002

CMD [ "npm", "run start" ]
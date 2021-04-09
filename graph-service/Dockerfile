FROM 14.16.1-alpine as production

WORKDIR /usr/src/job-service

COPY package*.json ./

RUN npm install --only=production

COPY /usr/src/job-service/dist ./dist

EXPOSE 3001

CMD [ "npm", "run start" ]
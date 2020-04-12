FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN cp config/default.json.example config/default.json
RUN npm install
CMD npm run server

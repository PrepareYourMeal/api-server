FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN cd client && npm install
CMD npm run server

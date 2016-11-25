FROM node:6.9.1

RUN npm rebuild

RUN mkdir -p /opt/home-js
RUN mkdir -p /opt/home-js/node_modules

COPY package.json /opt/home-js/

WORKDIR /opt/home-js

RUN npm install
EXPOSE 3000:3000
CMD ["node", "server.js"]

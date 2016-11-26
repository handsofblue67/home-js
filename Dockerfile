FROM node:6.9.1

RUN mkdir /opt/home-js && chown -R node:node /opt/home-js
WORKDIR /opt/home-js

USER node

COPY package.json /opt/home-js/

RUN npm cache clean && npm install

CMD ["node", "server.js"]

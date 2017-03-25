FROM node:6.10

RUN mkdir /opt/home-js && chown -R node:node /opt/home-js
WORKDIR /opt/home-js

COPY . /opt/home-js

RUN chown -R node:node /opt/* && chown -R node:node /usr/local
USER node

# COPY package.json /opt/home-js/

RUN npm cache clean && npm install

CMD ["npm", "start"]

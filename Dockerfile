FROM node:6.10

RUN mkdir /opt/home-js && chown -R node:node /opt/home-js
WORKDIR /opt/home-js

COPY package.json /opt/home-js/

RUN npm cache clean && npm install

# COPY . /opt/home-js

RUN chown -R node:node /opt/* && chown -R node:node /usr/local
USER node

CMD ["npm", "start"]

FROM node:6.9.1

RUN mkdir -p /opt/home-js
# RUN mkdir -p /opt/home-js/src
WORKDIR /opt/home-js

ADD server.js /opt/home-js

RUN npm install

EXPOSE 3000:3000

CMD ["node", "server.js"]

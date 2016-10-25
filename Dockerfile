FROM node:latest

RUN mkdir -p /opt/home-js
RUN mkdir -p /opt/home-js/src
WORKDIR /opt/home-js

ADD server.js /opt/home-js

EXPOSE 3000:3000

CMD ["node", "server.js"]

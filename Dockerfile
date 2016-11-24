FROM node:6.9.1
RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm

ENV HOME=/home/app
RUN mkdir -p /home/app/home-js

COPY package.json $HOME/home-js/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/home-js

RUN npm install
EXPOSE 3000:3000
CMD ["node", "server.js"]

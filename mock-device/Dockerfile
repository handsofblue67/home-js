FROM node:6.9.1

RUN mkdir /opt/mock-device && chown -R node:node /opt/mock-device
WORKDIR /opt/mock-device

USER node

COPY . /opt/mock-device/

RUN npm cache clean && npm install --save mqtt lodash rxjs chance

CMD ["node", "testDevice.js"]

FROM node:16.3.0-alpine
COPY ./build/ /opt/stonks-app
RUN node /opt/stonks-app/index.js

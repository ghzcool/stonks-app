FROM arm64v8/node:14.5.0-alpine
WORKDIR /opt/stonks-app
COPY ./build ./build
COPY ./index.js ./
COPY ./package*.json ./
EXPOSE 5000

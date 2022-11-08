FROM arm64v8/node:14.5.0-alpine
WORKDIR /opt/stonks-app
COPY ./build ./build
COPY ./index.js ./
COPY ./package*.json ./
RUN npm ci --only=production
EXPOSE 5000
CMD ["sh", "-c", "node index.js"]

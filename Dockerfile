FROM node:jod-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY ./src ./src
COPY public public

RUN npm run build

RUN npm install -g serve

CMD [ "serve", "-s", "build" ]

FROM node:fermium-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY ./src ./src
COPY public public

CMD [ "npm", "run", "build" ]

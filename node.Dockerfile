FROM node:alpine

#create project directory and cd in it
RUN mkdir -p /data/project
WORKDIR /data/project

# install project requirements
COPY package.json package.json
RUN npm install

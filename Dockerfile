FROM node:latest
RUN mkdir -p /opt/app 
WORKDIR /opt/app
#COPY ./myapp/package.json  ./
#WORKDIR /opt/app

COPY ./ ./
RUN npm rebuild node-sass
RUN npm install
ENV PORT 8080
EXPOSE   8080
CMD [ "npm", "run", "serve" ]

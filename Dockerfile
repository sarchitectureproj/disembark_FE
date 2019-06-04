FROM node:latest	# build stage
RUN mkdir -p /opt/app 	FROM node:10
WORKDIR /opt/app	WORKDIR /app
#COPY ./myapp/package.json  ./	COPY package*.json ./
#WORKDIR /opt/app	

 COPY ./ ./	
RUN npm rebuild node-sass	
RUN npm install	RUN npm install
ENV PORT 8080	COPY . .
EXPOSE   8080	RUN npm run build
CMD [ "npm", "run", "serve" ]	
 # production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

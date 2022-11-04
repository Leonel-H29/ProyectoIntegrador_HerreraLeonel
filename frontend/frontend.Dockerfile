#Primera etapa: Build

#FROM node:15.2.0-alpine3.10 as build-stage
FROM node:18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda etapa

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/frontend /usr/share/nginx/html

#EXPOSE 80

#CMD["nginx", "-g", "daemon off;"]
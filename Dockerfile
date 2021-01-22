FROM alpine:latest  
RUN apk --no-cache add --virtual builds-deps build-base python

FROM node:12
WORKDIR /app
COPY ./package.json /app
COPY . /app
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000

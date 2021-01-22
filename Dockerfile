FROM node:12
WORKDIR /app
COPY ./app/package.json /app
COPY ./app /app
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000


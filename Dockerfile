FROM node:12
WORKDIR /app
COPY ./package.json /app
COPY . /app
RUN npm install
RUN npm install bcrypt
CMD ["npm", "start"]
EXPOSE 3000


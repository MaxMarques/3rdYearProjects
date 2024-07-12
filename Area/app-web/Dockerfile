# FROM node:12

# RUN mkdir -p /app

# WORKDIR /app

# COPY package*.json /app/

# RUN npm install

# COPY . /app/

# EXPOSE 4200

# CMD ["npm", "start"]

FROM node:12

RUN mkdir -p /tmp

WORKDIR /tmp

COPY package.json /tmp/

RUN npm install

#COPY . /app/

EXPOSE 4200

CMD rm -rf /app/node_modules && mv /tmp/node_modules/ /app/ && cd /app && npm start
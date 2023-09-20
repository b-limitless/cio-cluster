FROM node:alpine
ENV CI=true
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY build/ .
# CMD ["npm", "start"]

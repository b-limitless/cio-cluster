FROM node:alpine
ENV CI=true
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
RUN npm run build
CMD ["npm", "startNode"]

FROM node:18-alpine
ENV CI=true
WORKDIR /app
COPY package.json .
RUN npm install 
#--omit=dev
COPY . .

# Run this only in production environment
# Block - 1
# RUN npm run build
# CMD ["npm", "run", "startNode"]

# Block - 1 Development 
CMD ["npm", "start"]

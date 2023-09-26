# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app/container

# Copy everything from ./container/ the pest to work dir
COPY ./ .

# Install dependencies for development
RUN npm install

# Use a custom start script to run the development server
CMD ["npm", "start"]
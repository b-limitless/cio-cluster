# Use this only in the production image-name:pasal-static-server
# Use an offical Node JS runtime as the base image
FROM node:16 as auth-builder

# Set the working directory inside the container
WORKDIR /app/auth

# Copy everything from ./auth/ the pest to work dir 
COPY ./auth .

# install production build
RUN npm install
RUN npm run build

# Use an offical Node JS runtime as the base image
FROM node:16 as container-builder

WORKDIR /app/container 
COPY ./container .
RUN npm install
RUN npm run build

# Use an official Nginx runtime as the base image
FROM nginx:alpine

# Copy files from auth builder to nginx auth directory 
COPY --from=auth-builder /app/auth/dist /usr/share/nginx/html/auth

# Copy files from container builder to nginx auth directory 
COPY --from=container-builder /app/container/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Remove this only when you are in production
#RUN rm -rf /app

# Start Nginx  
CMD ["nginx", "-g", "daemon off;"]


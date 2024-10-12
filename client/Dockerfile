# client/Dockerfile

# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the client app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the built app to the nginx server
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

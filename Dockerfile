# Use an official Node.js runtime as a parent image
FROM node:18 AS client-build

# Set the working directory for the client
WORKDIR /app/client

# Copy the client package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the rest of the client files and build the React app
COPY client/ ./
RUN npm run build

# Set the working directory for the server
FROM node:18 AS server-build

# Set the working directory for the server
WORKDIR /app/server

# Copy the server package.json and install dependencies
COPY server/package*.json ./
RUN npm install --production

# Copy the rest of the server files
COPY server/ ./

# Copy the built React app from the client-build stage to the server
COPY --from=client-build /app/client/build /app/server/build

# Expose the port the server runs on
EXPOSE 3000

# Command to run the Express server
CMD ["npm", "start"]

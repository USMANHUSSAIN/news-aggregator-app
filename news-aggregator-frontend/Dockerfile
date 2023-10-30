# Use the official Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the React app
RUN npm run build

RUN ls -al

# Expose port
EXPOSE 3000

# Start the React app
# CMD npm run start
CMD [ "sh", "-c", "npm run start" ]

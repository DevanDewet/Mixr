# Dockerfile for frontend
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that your frontend will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]  

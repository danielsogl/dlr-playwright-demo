FROM node:lts-alpine

# Install necessary system dependencies
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with specific store path
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 4200
EXPOSE 4200

# Start the application
CMD ["npm", "run", "ng", "serve", "--", "--host", "0.0.0.0"]

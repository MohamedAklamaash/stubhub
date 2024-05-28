# Use a lightweight Node.js image based on Alpine Linux
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json files
COPY package*.json /app/

# Install dependencies using npm ci for better reliability
RUN npm install

# Copy the rest of the application files
COPY . /app/

# Expose the port on which your application will run
EXPOSE 3000

# Specify the command to run your application
CMD [ "npm", "run", "dev" ]

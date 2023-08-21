# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json ./
COPY package-lock.json ./   
# COPY yarn.lock ./         # Use this line if you are using yarn

# Install dependencies
RUN npm install                  
# RUN yarn                  # Use this line if you are using yarn

# Copy the rest of the application files to the container
COPY . ./

# Build the production version of your React app
RUN npm run build

# Set the environment variable to run the React app in production mode
ENV NODE_ENV production

# Expose the port that the React app will run on (usually 3000)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
# CMD ["yarn", "start"]      # Use this line if you are using yarn

# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package.json yarn.lock ./

# Installs all node packages
RUN yarn install

# Copies everything over to Docker environment
COPY . .

# Build for production.
RUN yarn run build

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 8173

# Run application
#CMD [ "npm", "start" ]
CMD serve -l 8173 -s dist



# docker run -dp 127.0.0.1:8173:3000 stafvett

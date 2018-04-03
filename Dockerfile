FROM node:latest

#create /opt/app folder for the container
RUN mkdir -p /opt/app

#make /opt/app working directory
WORKDIR /opt/app

RUN npm install -g nodemon

#ports to make available for the app
EXPOSE 2000 3000

#command to start node app
CMD ["npm", "start"]
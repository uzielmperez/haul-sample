# install node (a container is like a mini-computer, and your mini-computer needs node in order to start a local server and use commands like npm ...)
FROM node:alpine
# copy all files from current directory into the docker image's current directory
COPY . .
# "RUN" commands are image build steps (i.e. install some other stuff on top the base image - in this case local dependencies) 
RUN yarn
# "CMD" is the default command executed by your container when you launch the built image - can be overwritten with 'docker run $image $other_command'
CMD [ "npm", "start" ]


# https://stackoverflow.com/questions/37461868/difference-between-run-and-cmd-in-a-dockerfile
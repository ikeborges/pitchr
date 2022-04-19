FROM node

RUN apt-get update
RUN apt-get install ghostscript -y
RUN apt-get install graphicsmagick -y

WORKDIR /usr/app

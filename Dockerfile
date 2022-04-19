FROM node

WORKDIR /usr/app

COPY . .

RUN apt-get update
RUN apt-get install ghostscript -y
RUN apt-get install graphicsmagick -y

RUN npm install

CMD npm run dev

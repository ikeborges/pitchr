FROM node:17

RUN apt-get update
RUN apt-get install ghostscript graphicsmagick -y

WORKDIR /usr/app/

COPY package-lock.json package.json /usr/app/

RUN npm install

COPY . .

USER node

CMD npm run dev

FROM node
WORKDIR /usr/src
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn build
WORKDIR /usr/src/build
RUN yarn install --production
CMD ["npm","start"]

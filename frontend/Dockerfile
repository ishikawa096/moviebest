FROM node:16.15.1-slim

WORKDIR /app

# COPY package.json /app
# COPY yarn.lock /app

RUN apt-get update -y
#   apt-get upgrade -y && \
#   apt install -y yarn
# RUN yarn add -D @swc/cli @swc/core
COPY . /app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

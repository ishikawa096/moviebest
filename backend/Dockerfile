FROM ruby:3.1.2-alpine3.16 AS build

RUN apk update && apk add --no-cache -t .build-dependencies \
  alpine-sdk \
  build-base \
  mysql-client \
  && apk add --no-cache \
  bash \
  libxml2-dev \
  libc-dev \
  libc6-compat \
  curl-dev \
  make \
  gcc \
  g++ \
  mysql-dev \
  tzdata \
  && gem install bundler:2.3.7 \
  && apk del --purge .build-dependencies \
  && rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/*

WORKDIR /backend
COPY Gemfile* /backend/
RUN bundle install -j4

FROM ruby:3.1.2-alpine3.16

RUN apt update && apt install -y --no-install-recommends \
  default-libmysqlclient-dev \
  make \
  # gcc \
  g++ \
  sudo \
  nginx \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /backend
COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . /backend

# RUN mkdir -p tmp/sockets
# RUN mkdir tmp/pids

RUN groupadd nginx && useradd -g nginx nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

FROM ruby:3.1.2-slim-bullseye

WORKDIR /backend

ADD Gemfile* /backend/

RUN apt update && apt install -y \
  build-essential \
  default-libmysqlclient-dev \
  && gem install bundler:2.3.7 \
  && bundle install \
  && apt clean

ADD . /backend

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

FROM ruby:3.1.2-slim-bullseye

RUN apt update && apt install -y \
  build-essential \
  default-libmysqlclient-dev \
  && apt clean

WORKDIR /backend

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

FROM ruby:3.1.2-slim-bullseye

RUN apt update && apt install -y build-essential libpq-dev nodejs default-libmysqlclient-dev && apt clean

ENV APP_PATH /moviebest

WORKDIR $APP_PATH

COPY Gemfile* $APP_PATH/
RUN bundle install -j3

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

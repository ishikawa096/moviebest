#!/bin/bash
set -e

bundle config set path 'vendor/bundle'
bundle install -j3

echo n | bundle exec rails db:setup

rm -f /backend/tmp/pids/server.pid

exec "$@"

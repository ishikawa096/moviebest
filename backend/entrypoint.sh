#!/bin/bash
set -e

echo n | bundle exec rails db:setup

rm -f /backend/tmp/pids/server.pid

exec "$@"

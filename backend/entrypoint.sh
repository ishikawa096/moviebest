#!/bin/bash
set -e

sudo service nginx start
cd /backend
bin/setup
bundle exec pumactl start

echo n | bundle exec rails db:setup

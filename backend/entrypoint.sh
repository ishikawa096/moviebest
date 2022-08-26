#!/bin/bash
set -e

sudo service nginx start
cd /backend
bin/setup
bundle exec pumactl start

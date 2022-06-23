#!/bin/bash
set -e

rm -f /moviebest/tmp/pids/server.pid

exec "$@"

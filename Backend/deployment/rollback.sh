#!/bin/bash

echo "Rolling back..."
pkill -SIGTERM -f app-v2
node apps/app-v1/server.js &

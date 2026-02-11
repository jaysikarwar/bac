#!/bin/bash

echo "Starting new version..."
node apps/app-v2/server.js &

sleep 5

echo "Switching traffic..."
# update nginx upstream

echo "Stopping old version..."
pkill -SIGTERM -f app-v1

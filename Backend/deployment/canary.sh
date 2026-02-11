#!/bin/bash

echo "Starting canary..."
node apps/app-v2/server.js &

echo "Routing 10% traffic to new version"
# update nginx weight

sleep 30
echo "Increasing traffic gradually..."

#!/bin/bash

cd ..

# Install dependencies and start the Vue development server
echo "Starting Vue project..."
npm install
npm run dev &

# Store the PID of the Vue development server
VUE_PID=$!

# Navigate to the proxy server directory
cd ./proxy-server

# Start the proxy server
echo "Starting proxy server..."
node server.js &

# Store the PID of the proxy server
PROXY_PID=$!

# Function to handle termination and cleanup
cleanup() {
  echo "Stopping Vue project..."
  kill $VUE_PID
  echo "Stopping proxy server..."
  kill $PROXY_PID
  exit 0
}

# Trap signals to clean up when the script is interrupted or terminated
trap cleanup EXIT

# Loop to wait for the "quit" command from the user
while true; do
  read -r -p "Type 'quit' to stop the servers: " input
  if [ "$input" == "quit" ]; then
    cleanup
  fi
done
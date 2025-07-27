#!/bin/bash

echo "Starting server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting server on port 3001..."
echo "API: http://localhost:3001"
echo "Press Ctrl+C to stop"
echo ""

node src/server.js 
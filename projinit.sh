#!/bin/bash

# List of directories to run npm install in
directories=("auth" "client" "expirationservice" "orderservice" "paymentservice" "ticketservice")

# Loop through each directory and run npm install
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "Running 'npm install' in $dir"
        (cd "$dir" && npm install)
    else
        echo "Directory $dir does not exist, skipping..."
    fi
done

echo "All npm installs completed!"


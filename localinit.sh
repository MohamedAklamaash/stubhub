#!/bin/bash

cd "$("stuhub")"

find . -type f -name "package.json" -execdir npm install \;

echo "npm install completed in all subdirectories containing a package.json"


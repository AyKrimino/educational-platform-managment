#!/bin/bash
echo "Building for GitHub Pages..."
npm run build
echo "Starting preview server at http://localhost:5000/educational-platform-managment/"
npm run preview
#!/bin/sh

# Start the server in the background
npm run serve &

# Run the cron job in the background
npm run parse-channels-cron &

# Wait for all background processes to finish
wait
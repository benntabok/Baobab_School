#!/bin/bash

#configuration
SERVER_PORT=8080
SERVER_EXEC="./baobab_server"
LOG_FILE="server_monitor.log"

# Check if server is running
# if ! lsof -i :$SERVER_PORT > /dev/null; then
#     echo "$(date): Server down! Restarting..." >> $LOG_FILE
#         # Start the server in the background
#             $SERVER_EXEC &
#             else
#                 echo "$(date): Server is healthy." >> $LOG_FILE
#                 fi

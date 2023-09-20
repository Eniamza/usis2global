#!/bin/bash

# Change to the directory of your Git repository
cd /root/usis/usis2global

# Check for local changes
if git diff --quiet; then
    echo "No local changes."
else
    # Commit changes with a timestamp as the commit message
    git add .
    git commit -m "Automatic commit on $(date +\%Y-\%m-\%d_\%H:\%M:\%S)"
    git push
    echo "Changes committed and pushed."
fi


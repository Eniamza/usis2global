#!/bin/bash

# Change to the directory of your Git repository
cd /root/usis/usis2global || exit 1

# Check for local changes
if git diff --quiet; then
    echo "No local changes."
else
    # Commit changes with a timestamp as the commit message
    if git add . && git commit -m "Automatic commit on $(date +\%Y-\%m-\%d_\%H:\%M:\%S)"; then
        if git push origin master; then
            echo "Changes committed and pushed."
        else
            echo "Failed to push changes." >&2
        fi
    else
        echo "Failed to commit changes." >&2
    fi
fi


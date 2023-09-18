@echo off

:: Navigate to your Git repository directory
cd /d "F:\Hek\usis2global\usis2global"

:: Add all changes
git add .

:: Commit changes with a commit message
git commit -m "scheduled commit"

:: Push changes to the remote repository
git push

:: Optional: Display a message
echo Git add, commit, and push completed.
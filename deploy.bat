@echo off
echo Deploying to GitHub Pages...
echo.

cd /d "C:\Users\user\Documents\ApnaCollage\nijhum\BIS5203-WebApp"

echo Initializing Git repository...
git init

echo Adding remote repository...
git remote add origin https://github.com/nawshinnijhum/portfolio.git

echo Adding all files...
git add .

echo Committing files...
git commit -m "Add portfolio website files"

echo Pushing to GitHub...
git push -u origin main

echo.
echo Deployment complete!
echo Your site will be available at: https://nawshinnijhum.github.io/portfolio/
echo Single-page site: https://nawshinnijhum.github.io/portfolio/about.html
echo.
echo Please enable GitHub Pages in repository settings if not already done.
pause

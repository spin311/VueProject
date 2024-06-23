vite build
cd dist
git add .
git commit -m "Deploy gh-pages"
git subtree push --prefix dist origin gh-pages
# Spanish words practice frontend

This repository contains the frontend part of the application, main objective of which: repeat spanish words.
Backend for this application could be found: [here](https://github.com/ZakharovAleksey/spanish_words_backend).

Link to the site: [repeat-spanish-words](https://zakharovaleksey.github.io/spanish_words_frontend/)

### Action items

List of the action items:
- [X] possibility to make a request of last words in the table (or all)
- [X] fix the success percent calculation (make minimum 0)
- [X] make credentials check before the loading the names of the tables on main page
- [ ] (opt) look how to add animation etc
- [ ] (opt) look how to avoid change of the categories input 
- [ ] (back) make user authorization page to make it more user-oriented


## Project Setup

Do the following steps:
```sh
# Clone the repository
git clone https://github.com/ZakharovAleksey/spanish_words_frontend.git

# Go to the repository
cd spanish_words_frontend
# Install required packages
npm install
# Run in the development mode
npm run dev
```

### Deploy for the GitHub pages

Origin article: [here](https://learnvue.co/articles/deploy-vue-to-github-pages)

Do the following steps:
```sh
# Build application, so output is in the 'dist' folder
npm run build
# Add `dist` folder changes. -f because by default 'dist' is in .gitignore file 
git add dist -f
# Commit changes in the 'dist' folder
git commit -m "[+] Update dist. ver. N"
# Create subtree 'gh-pages' branch and push changes to this branch 
git subtree push --prefix dist origin gh-pages
```

In a couple of minutes go to the repository and check updates:
1. Go to the "Settings" section
2. Go to the "Pages" section
3. Click "Visit site" button on the top

P.S. In case you can't push to your `gh-pages` branch, remove the branch and push once again:
```sh
# Remove existing branch remotely
git push origin --delete gh-pages
# Remove existing branch remotely
git branch --delete gh-pages
# Checkout after run build to local branch 
git checkout -b gh-pages
# !!! AFTER THIS DO THE FIRST 3 STEPS FROM THE "Do the following steps" section above.
# !!! So, we create 'dist' folder only in gh-pages branch 
# Create subtree 'gh-pages' branch and push changes to this branch and push only this folder
git subtree push --prefix dist origin gh-pages
```

### Useful links

List of the useful links I found during the development:
* [Icons storage](https://www.flaticon.com/)
* [Converter: PNG to SVG](https://www.adobe.com/express/feature/image/convert/png-to-svg)
* [SVG editor](https://deeditor.com/)
* [GitHub pages deployment](https://learnvue.co/articles/deploy-vue-to-github-pages)

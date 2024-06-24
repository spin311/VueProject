# Vue Project

Simple vue project to display a gallery of cats with buttons to like or download each cat image.
### [`GitHub Pages link`](https://spin311.github.io/VueProject/)
![Cat Gallery](/images/catGallery.png)

## Run project locally
1. Clone the repository
2. Add a `.env` file in the root directory, add the following line: VITE_CAT_API_KEY={YOUR_CAT_API_KEY}
3. Run `npm install`
4. Run `npm run dev`
5. cd `proxy-server` 
6. Run `node server.js` to start the proxy server
7. Open [`http://localhost:5173/VueProject/`](http://localhost:5173/VueProject/) in your browser

(Steps 5 and 6 are only needed if you want to use local proxy server)
P.S. : proxy server is deployed on render.com, when testing locally, uncomment variable serverUrl in `src/services/catService.ts` and comment out the other serverUrl variable to use the local proxy server
## Run tests
run `npx cypress open` in root directory to open the cypress test runner
There are 2 tests: one for the home and favorites page and one for the breed page
## Features
![Features](/images/features.jpg)
- Display a gallery of cat images with infinite scroll
- Like, download and share each cat image
- Search for a specific cat breed, view gallery of images and information for that breed
- Display a list of favorite cat images
- Banners to display error, info, or success messages
- Responsive design for mobile, tablet, and desktop

  ![Phone View](/images/phoneView.jpg)

## Project structure
- `src/*` - Vue components, views, stores, services, assets, etc.
- `dist/*` - Build files
- `public/*` - Static files
- `proxy-server/*` - Express server to proxy requests to the Cat API
- `scripts` - shell / bat scripts to deploy the project to GitHub Pages, build locally (bat script not tested)
- `tests/*` - Cypress Unit tests


## Technologies
- Vue + TypeScript
- Pinia
- Axios
- Express (proxy server)
- Render.com (deployment)

## Possible improvements
- Add more tests
- Add more features like sorting, filtering, etc.
- Save data to database

# ICT Procurement Taskforce "Microsite"
## What is this?
This is a HTML version of the ICT Procurement Taskforce website. The site has been migrated from the Department of Prime Minister and Cabinet to the Digital Transformation Agency. Other than the removal of the form, some minor changes the content is the same.

## Installation

1. Check that Node and NPM are installed using `$ node -v` and `$ npm -v`. The site uses gulp 4.0, so you may need to update Node and/or NPM to install it. If these are not installed, please install using Homebrew or use the instructions on the [Node.js site](https://nodejs.org/en/).
2. Install gulp globally using `$ npm install gulp-cli -g`.
3. Run `$ npm install` in the theme folder to install the required dependencies.
4. Update the URLs in `config.yml` to reflect your environment. If you do not have a production or staging server set them to the development server.
5. Run `$ gulp` to start the build process. This will do the following:
  1. Clean out the `dist` folder.
  2. Rebuild the `dist` folders.
  3. Start a local server to serve the `dist` folder.
  4. Begin watching changes to SCSS, HTML and JS files. Changes to SCSS files will be injected into the local site.
  5. Minify the JavaScript.
  6. Flatten the HTML using [Panini](https://github.com/zurb/panini).

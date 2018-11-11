Setup is based on:
https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658

Note: versions might get updated.

From app root (/app):

npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0
npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2
npm install --save-dev react@16.5.2 and react-dom@16.5.2
npm install --save-dev react-hot-loader@4.3.11

npm install
npm run-script build

npm start

Stop localhost server:
killall -9 node

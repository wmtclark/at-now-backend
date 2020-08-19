# At Now API 

![Team Photo](Insert a Team Photo URL here)
[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

This is the backend for the at-now extension. It will be used to store the user's calendars, and will be able to supply calendar event information given the user's free time and an assignment type. 

## Architecture

* node with babel
* expressjs
* airbnb eslint rules
There is currently no auth, as all user information is dealt with in a google auth on the front end. 

## Setup

1. pull the code from the repo
2. run `yarn install` in order to get the required dependencies
3. add the .env file to the root directory containing the correct secret keys
4. run `yarn start` to deploy to [localhost9090](http://localhost:9090/) for testing and debugging locally


## Deployment

Link a github repo to deploy to heroku, instructions [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
Link the heroku app to mongo atlas for storage, instructions [here](https://docs.atlas.mongodb.com/getting-started/)

## Authors

Garret Andreine, Jai Smith, Nathan Schneider, Vincent Liu, Carter Person, Thomas Clark

Starterpack supplied by Tim Tregubov and CS52 

## Acknowledgments
Based largely on the starter express template from Dartmouth CS52 20X. Big thank you to Tim Tregubov and the TA's for all their help. 

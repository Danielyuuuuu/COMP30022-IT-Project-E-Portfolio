# Runtime Terror
https://e-portfolio-website.herokuapp.com/
## Eportfolio
This eportfolio is built using the MERN stack, consisting of a React frontend served by a NodeJS backend running Express and connected to a MongoDB database. We will be using heroku to host our eportfolio website in this project. 

## Deployment Pipeline
1. Create a heroku app for our eportfolio by running `heroku create <app-name>`.
2. Deploy the app to the created heroku app using the command: `git push heroku master`
3. The website will be automatically deployed from now on based on what’s in the master branch.

## Development
1. Navigate to the server directory with `cd server`.
2. Execute `npm run dev` to start both the React client and Express server in development mode allowing instant refreshes. The React client listens on port 3000 and the Express server listens on port 8080. Any changes in the code will be displayed after a page refresh.

## Run the website locally
1. Copy the git repository to your local machine.
2. In the root directory, run `npm run build` to install all the dependencies and packages.
3. Then run `npm run dev` to start the express server and react client simultaneously.
4. The server listens on port 8000 and the react client is running on port 3000. The web page can now be visited and run normally in your local machine browser by going to `localhost:3000`.

## Contributors
- Dongcheng Ding  
- Kai Li  
- Juntong (Angel) Tan  
- Adrian Tang  
- Yifei Yu  
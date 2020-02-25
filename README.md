# Opus App

Users management app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have nodejs and git installed on your computer.

Go to https://nodejs.org/ to download latest recommended version and install it.  
Go to https://git-scm.com/downloads to download version for your OS and install it.



### Installing

Once Prerequisites are met, navigate to an empty folder with your terminal and initialize new git repo:
```
git init
```
Now pull remote repository to local repo with following command:
```
git pull https://github.com/Karabarak/Opus.git
```
Once done we need to install all dependencies. In root folder of the repo run command:
```
npm i
```
This will install all backend dependencies. Now navigate to /client folder and run the same command.
This will install all frontend dependencies. Once done, navigate back to root folder and run command:
```
npm run dev
```
This will run a script which will run frontend and backend at the same time on localhost.
Now you should be able to check out the app! Have fun!
## About app requirements
Requirements met:
* Backend with node API(express)
* Frontend SPA with REACT + Redux
* Using JSON Web Token for authentication
* App is using scripts
* Possibility to Register, Log in, view all users, delete users, create users, see users details.
* Email verification upon registration (verification link is logged in clientside console, no actial email is sent)
* Email notification upon user deletion (postmarkapp response is logged in clientside console, no actual email is sent)
* Upon creating new user(from users list) postmark response and email verification link from that new user is logged in client console, no actual email is sent.
* Frontend localization
* Users list pagination

Requirements not met:
* No actual notification emails are sent, due to using postmark test API key.
* Using only javascript
* Password recovery not implemented

Additionally:
* Frontend is responsive
* Using mongoDB(mongoDB Atlas)
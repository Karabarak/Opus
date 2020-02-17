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

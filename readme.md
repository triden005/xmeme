# Xmeme

---

A mini platform for putting memesUrl with caption that was a part CWOD stage 2

The repo consisits of

-   the Frontend folder
-   The Backend
-   And the installation and running scripts

## Core Dependencies

-   Nodejs
-   npm
-   mongoDB

## Steps For Local setup

-   install.sh for installing Node and Mongo DB
-   Run the server_run.sh for starting the server at :8081
-   then switch to Frontend then npm install&&npm start for running the dev Frontend server

## Stack Details

-   Frontend
    -   Create React App with axios
-   Backend
    -   Nodejs && Express with
    -   validator,Mongoose,Morgan,Cors & dotend
-   DB
    -   MongoDB

## Endpoints

|    Path     |  Type  |                           |
| :---------: | :----: | :-----------------------: |
|   /memes    |  GET   |   for getting all Memes   |
|   /memes    |  POST  |   for adding new Memes    |
| /memes/{id} |  GET   | for getting a Meme by id  |
| /memes/{id} | PATCH  | for editing a valid Meme  |
| /memes/{id} | DELETE | for deleting a valid Meme |

## Environment Variables

-   Backend
    -   Port the Backend Port (Default 8081)
    -   MONGODB_URL the mongodb uri (Default mongodb://localhost:27017/xmeme )
-   Frontend
    -   REACT_APP_BACKENDIP the Backend Url( Default http://localhost:8081 )

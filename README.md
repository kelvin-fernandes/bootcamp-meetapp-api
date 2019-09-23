[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="center">
  <h3 align="center">Meetapp | Backend</h3>

  <p align="center">
    App that aggregates events for developers (an acronym for Meetup + App).
    <br />
  </p>
</p>

## Table of Contents

-   [About the Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

## About The Project

This project is about an application that is focused on events for developers. The main features are: list events for a logged user, where he can subscribe and unscribe it.

For while, we have just the backend builded, but in a short future we'll have a fontend and a mobile app to get this thing really alive.

### Built With

-   [NodeJS](https://nodejs.org/en/download/) - JavaScript runtime
-   [Express](https://devdocs.io/express/) - Web Framework to built REST API

## Getting Started

So, to get this project alive:

### Prerequisites

-   [yarn](https://yarnpkg.com/en/docs/install)

### Installation

1. Clone the repo

```sh
git clone https://github.com/kelvin-fernandes/bootcamp-meetapp-api.git
```

To get a development env running you need to run the following steps.

Follow the instructions bellow to get the docker containers running.

```sh
# run docker containers: postgres and redis.
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
$ docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine
```

Using Migrations, you need to run this command to make the database schema.

```sh
# run migrations to create the database schema.
$ yarn sequelize db:migrate
```

Copy the .env.example and setup a new .env file on project root folder, where it will have things like:

```
# Postgres
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_NAME=dbname
```

2. install all application dependencies.

```sh
$ yarn
```

## Usage

And finally.

```
yarn dev
```

(Optional) Running this command bellow, you will get a queue to process a notification sent by email. To get this working, it's necessary that a Redis container is being running. Also, you have to make an account on [mailtrap.io](https://mailtrap.io) to get an inbox, so you setup this inbox infos on .env file.

```
yarn queue
```

For while, to request some data it's simple, open [Imsomnia](https://insomnia.rest/download/) and follow these steps: Click on workspace name > Import/Export > Import Data > From File. Select imsomnia.json that is on the root of the project folder.

1. Create a user.
2. Create a session.
3. Copy and paste token in global variable.
4. Enjoy yourself.

## Contact

Kelvin Fernandes - [@i4kelvin](https://instagram.com/i4mkelvin) - sokelvinfernandes@gmail.com

Project Link: [https://github.com/kelvin-fernandes/bootcamp-meetapp-api](https://github.com/kelvin-fernandes/bootcamp-meetapp-api)

## Acknowledgements

-   [Bee-queue](https://github.com/bee-queue/bee-queue) - Job/Task queue
-   [Bcrypt](https://github.com/dcodeIO/bcrypt.js/) - Hash cryptography
-   [Date-fns](https://date-fns.org/) - Date toolset
-   [Express-handlebars](https://github.com/ericf/express-handlebars) - View engine
-   [JWT](https://github.com/auth0/node-jsonwebtoken/) - Auth
-   [Morgan](https://github.com/expressjs/morgan) - HTTP request logger
-   [Multer](https://github.com/expressjs/multer) - Multipart/form-data handler
-   [Nodemailer](https://nodemailer.com/) - email sending
-   [Sequelize](https://sequelize.org) - Promise-based ORM
-   [Yup](https://github.com/jquense/yup) - Object schema validation
-   [ESLint](eslint.org) - Linting utility for JavaScript
-   [Nodemon](https://nodemon.io) - Utility to monitor files changes and reload
-   [Prettier](prettier.io) - Code formatter
-   [Sucrase](https://github.com/alangpierce/sucrase) - Super-fast development builds

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=1178B3
[linkedin-url]: https://linkedin.com/in/kelvin-fernandes

# Meetapp API

This API makes part of a bootcamp project. It's a Rocketseat's bootcamp, where I learn a stack called by them: OmniStack, using the following technologies NodeJS (backend), ReactJS (frontend) and React Native (mobile). Full JS <3

This project is about an app that aggregates events for developers (an acronym for Meetup + App).

## Getting Started

So, to get this project alive:

-   run docker containers: postgres and redis.
-   run migrations to create the database schema.
-   setup the .env file.

### Prerequisites

Follow the instructions bellow to get the docker containers running.

```sh
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
$ docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine
```

Copy the .env.example and setup a new .env file on project root folder, where it will have things like:

```
# Postgres
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_NAME=dbname
```

### Installing

So, to get a development env running you need to run the following steps.

This will install all application dependencies.

```sh
$ yarn
```

Using Migrations, you need to run this command to make the database schema.

```sh
$ yarn sequelize db:migrate
```

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

## Built With

-   [NodeJS](https://nodejs.org/en/download/) - JavaScript runtime
-   [Express](https://devdocs.io/express/) - Web Framework to built REST API
-   [Yarn](https://yarnpkg.com/en/docs/install) - Dependency Management
-   [Postgres](https://www.postgresql.org/docs/) - Main database
-   [Bee-queue](https://github.com/bee-queue/bee-queue) - Job/Task queue
-   [Redis](https://redis.io/documentation) - In-memory data structure store

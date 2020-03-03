# Insight Email Tracking Micro Service

Micro Service responsible for tracking user interaction with email independent from any platforms. Currently it has two exposed endpoints: email opened and links clicked inside email tracking.

---
## Requirements

For development, you will only need Node.js and a node global package manager, NPM, installed in your environment.

## Install

    $ git clone https://gitlab.com/rob_/insight-statistics-micro-service.git
    $ cd insight-statistics-micro-service
    $ npm install

## Configure app

Open `config/NODE_ENV.js` then edit it with your settings. You will need:

- NODE_ENV may have two possible values: `dev` or `prod`
- A port for the application to run;
- MongoDB url;

## Running the project
    During development
    $ npm run dev

## Code linting
    $ npm run lint

## Tests
    $ npm run test

## Simple build for production

    $ npm run start
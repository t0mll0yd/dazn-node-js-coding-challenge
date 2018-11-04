# Dazn Node.js Coding Challenge

This repo contains my attempt to complete the Dazn Node.js coding challenge.
It is an Express based service written in Typescript.

### Running the app

To run this app, you will need to have Node and Yarn installed. I have Node version 'v11.0.0' and Yarn version '1.10.1' but
it should work with any recent version. First, clone the repository and install the required node modules:

```
git clone git@github.com:t0mll0yd/dazn-node-js-coding-challenge.git

cd dazn-node-js-coding-challenge

yarn
``` 

The service can then be built by compiling the Typescript and using node to run the app, as follows:

```
yarn build

yarn start
```

These commands are defined within the `package.json` file.

### Testing

Linting for the app can be run with the command:

```
yarn lint
```

Unit tests can be ran using:

```
yarn test-unit
```

There are also component tests which use supertest to hit the API directly. For these to pass,
you will need to have the API service running. You can point the tests to the correct location by setting `API_LOCATION` which
defaults to `http://localhost:3000` (the default local running location). Run these tests by typing:

```
yarn test-component
```

Or alternatively run both unit and component tests with:

```
yarn test
```

# Dazn Node.js Coding Challenge

This repository contains my submission for the Dazn Node.js coding challenge.
It is an Express based service written in Typescript.

### API

For a given user, with a USER_ID, you can add a video stream, with a STREAM_ID. You can add a maximum of 3 streams.
An assumption here is that stream IDs are unique for all combinations of content and devices on which the content is being watched. 
This allows the POST request to be idempotent.

```
POST /users/USER_ID/streams/STREAM_ID
```

If the user has 2 or less current streams, this will return a `201 CREATED` response.
Otherwise, it will return a `409 CONFLICT` with a message body:

```
{
    "error": {
        "code": "streams.limit.reached",
        "message": "This user already has the maximum number of concurrent streams."
    }
}
```

NB: The endpoint requires basic auth to access and uses the following credentials: `username:password ` (super secure!). Without this the
endpoint will respond with a `401 UNAUTHORIZED`.

### Pipeline And Deployment

There is a simple build pipeline set up for this project on Circle CI. This runs all tests and linting,
and publishes the latest code from master as a Docker image to ECR (Amazon's Elastic Container Registry). This is then deployed
to ECS (Amazon's Elastic Container Service) which is available at the following URL:

http://ec2co-ecsel-1bd8m940aolpz-1729440468.us-east-2.elb.amazonaws.com:3000

Containerising the application and hosting on ECS allows for easy scalability (both manual and automatic)
which can be implemented through the ECS dashboard.

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

Linting is done with TSLint and can be run with the command:

```
yarn lint
```

Unit tests are in Jest and can be ran using:

```
yarn test-unit
```

Component tests are also in Jest. They also use supertest to hit the API directly. For these to pass,
you will need to have the API service running. You can point the tests to the correct location by setting the `API_LOCATION` env var, which
defaults to `http://localhost:3000` (the default local running location). Run these tests by typing:

```
yarn test-component
```

Or alternatively run both unit and component tests with:

```
yarn test
```

### Further Improvements

Given more time, here are some other things that could have been done:

- The basic auth should be replaced with a more sophisticated authentication mechanism, such as OAuth2.
- The console logs should be replaced with a logger that can produce ELK logs (or similar). This would allow querying, as well as the possibility of setting up alerts.
- The in-memory store for user streams should be replaced by a proper database backend. Currently, if you restart the server, everything is lost. Woops!

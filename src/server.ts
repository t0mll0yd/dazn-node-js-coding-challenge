import express = require("express");

import StreamsController from "./controllers/Streams";
import HealthCheckController from "./controllers/HealthCheck";
import AuthenticationMiddleware from "./middleware/Authentication";

const port = process.env.PORT || 3000;

const app = express();

app.get("/health-check", HealthCheckController);
app.use(AuthenticationMiddleware);
app.post("/users/:userId/streams/:streamId", StreamsController);

app.listen(port, () => console.log(`Listening on port ${port}...`));

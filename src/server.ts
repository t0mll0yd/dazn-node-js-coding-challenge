import express = require("express");

import AuthenticationMiddleware from "./middleware/Authentication";
import StreamsController from "./controllers/Streams";

const port = process.env.PORT || 3000;

const app = express();

app.get("/health-check", (req, res) => { res.send() });
app.use(AuthenticationMiddleware);
app.post("/users/:userId/streams/:streamId", StreamsController);

app.listen(port, () => console.log(`Listening on port ${port}...`));

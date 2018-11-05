import express = require("express");

const app = express();
const port = 3000;

app.get("/users/:userId/streams/:streamId", (req, res) => {
    res.statusCode = 201;
    res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`)); // tslint:disable-line:no-console

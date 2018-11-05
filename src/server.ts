import express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello from CIRCLE CI"));

app.listen(port, () => console.log(`Listening on port ${port}...`)); // tslint:disable-line:no-console

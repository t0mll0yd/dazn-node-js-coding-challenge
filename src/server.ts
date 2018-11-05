import express = require("express");
import {InMemoryStore} from "./stores/InMemoryStore";

const app = express();
const port = 3000;

const store = new InMemoryStore();

app.post("/users/:userId/streams/:streamId", (req, res) => {
    const { userId, streamId } = req.params;
    const streams = store.getStreams(userId);

    console.log(`Received stream '${streamId}' for user '${userId}'. Current streams: [${Array.from(streams).join(", ")}].`);

    if (streams.has(streamId)) {
        console.log("Stream already exists.");

        res.statusCode = 200;
        res.send()
    } else if (streams.size > 2) {
        console.log("Maximum concurrent stream limit reached.");

        res.statusCode = 409;
        res.send()
    } else {
        console.log("Adding new stream.");

        store.addStream(userId, streamId);

        res.statusCode = 201;
        res.send();
    }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

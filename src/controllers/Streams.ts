import { Request, Response } from "express";
import errorResponse from "../responses/errorResponse";
import {InMemoryStore} from "../stores/InMemoryStore";

// This should be replaced with a database implementation.
const store = new InMemoryStore();

export default async (req: Request, res: Response) => {
    const { userId, streamId } = req.params;
    const streams = await store.getStreams(userId);

    console.log(`Received stream "${streamId}" for user "${userId}". Current streams: [${Array.from(streams).join(", ")}].`);

    if (streams.has(streamId)) {
        console.log("Stream already exists.");

        res.statusCode = 200;
        res.json();
    } else if (streams.size > 2) {
        console.log("Maximum concurrent stream limit reached.");

        res.statusCode = 409;
        res.json(errorResponse(
            "streams.limit.reached",
            "This user already has the maximum number of concurrent streams."
        ));
    } else {
        console.log("Adding new stream.");

        await store.addStream(userId, streamId);

        res.statusCode = 201;
        res.json();
    }
};

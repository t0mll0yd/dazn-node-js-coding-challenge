import * as supertest from "supertest";

const request = supertest(process.env.API_LOCATION || "http://localhost:3000");

const randomID = () => Math.random().toString(36).substring(2);

const username = process.env.API_USERNAME || "username";
const password = process.env.API_PASSWORD || "password";

const addStream = (userId: string, streamId: string): supertest.Test => {
    return request
        .post(`/users/${userId}/streams/${streamId}`)
        .auth(username, password);
};

describe("Server", () => {
    test("GET '/' without basic auth returns 401 UNAUTHORIZED", async () => {
        await request
            .get("/")
            .expect(401);
    });

    test("GET '/' returns 404 NOT FOUND", async () => {
        await request
            .get("/")
            .auth(username, password)
            .expect(404);
    });

    test("GET '/health-check' returns 200 OK without the need for basic auth", async () => {
        await request
            .get("/health-check")
            .expect(200, { message: "Hello from the Typescript/Node JS/Express based DAZN coding challenge service!"});
    });

    test("GET '/users/USER_ID/streams/STREAM_ID' returns 404 NOT FOUND", async () => {
        await request
            .get(`/users/${randomID()}/streams/1`)
            .auth(username, password)
            .expect(404);
    });

    test("POST '/users/USER_ID/streams/STREAM_ID' returns 201 CREATED", async () => {
        await request
            .post(`/users/${randomID()}/streams/1`)
            .auth(username, password)
            .expect(201);
    });

    test("POST with already added STREAM_ID returns 200 OK", async () => {
        const userId = randomID();

        await addStream(userId, "1").expect(201);
        await addStream(userId, "1").expect(200);
    });

    test("Fourth added STREAM_ID for a user returns 409 Conflict", async () => {
        const userId = randomID();

        const maxStreamsErrorResponse = {
            error: {
                code: "streams.limit.reached",
                message: "This user already has the maximum number of concurrent streams.",
            },
        };

        await addStream(userId, "1").expect(201);
        await addStream(userId, "2").expect(201);
        await addStream(userId, "3").expect(201);
        await addStream(userId, "4").expect(409, maxStreamsErrorResponse);
    });
});

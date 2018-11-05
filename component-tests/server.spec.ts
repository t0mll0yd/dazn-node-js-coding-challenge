import * as supertest from "supertest";

const request = supertest(process.env.API_LOCATION || 'http://localhost:3000');

const randomID = () => Math.random().toString(36).substring(2);

const addStream = (userId: string, streamId: string): supertest.Test => {
    return request.post(`/users/${userId}/streams/${streamId}`)
};

describe("Server", () => {
    test("GET '/' returns 404 NOT FOUND", async () => {
        await request
            .get('/')
            .expect(404)
    });

    test("GET '/users/USER_ID/streams/STREAM_ID' returns 404 NOT FOUND", async () => {
        await request
            .get(`/users/${randomID()}/streams/1`)
            .expect(404)
    });

    test("POST '/users/USER_ID/streams/STREAM_ID' returns 201 CREATED", async () => {
        await request
            .post(`/users/${randomID()}/streams/1`)
            .expect(201)
    });

    test("POST with already added STREAM_ID returns 200 OK", async () => {
        const userId = randomID();

        await addStream(userId, "1").expect(201);
        await addStream(userId, "1").expect(200);
    });

    test("Fourth added STREAM_ID for a user returns 409 Conflict", async () => {
        const userId = randomID();

        await addStream(userId, "1").expect(201);
        await addStream(userId, "2").expect(201);
        await addStream(userId, "3").expect(201);
        await addStream(userId, "4").expect(409);
    });
});

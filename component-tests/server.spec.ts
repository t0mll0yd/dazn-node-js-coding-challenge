import * as supertest from "supertest";

const request = supertest(process.env.API_LOCATION || 'http://localhost:3000');

describe("Server", () => {
    test("path '/' returns 404 NOT FOUND", () => {
        return request
            .get('/')
            .expect(404)
    });

    test("path '/users/USER_ID/streams/STREAM_ID' returns 201 CREATED", () => {
        return request
            .get('/users/1/streams/1')
            .expect(201)
    });
});

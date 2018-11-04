import * as supertest from "supertest";

const request = supertest(process.env.API_LOCATION || 'http://localhost:3000');

describe("Server", () => {
    test("path '/' returns 200 Hello World", () => {
        return request
            .get('/')
            .expect(200)
            .then(response => {
                expect(response.text).toBe("Hello, World!");
            });
    });
});

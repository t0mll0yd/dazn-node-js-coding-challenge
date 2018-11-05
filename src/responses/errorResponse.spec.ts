import errorResponse from "./errorResponse";

describe("ErrorResponse", () => {
    test("creates an error response body given a code and a message", () => {
        const response = errorResponse("code", "message");

        expect(response).toEqual({ error: { code: "code", message: "message" } });
    });
});

import basicAuth = require('express-basic-auth');
import errorResponse from "../responses/errorResponse";

const username = process.env.API_USERNAME || "username";
const password = process.env.API_PASSWORD || "password";

export default basicAuth({
    users: { [username]: password },
    unauthorizedResponse: errorResponse(
        "client.unauthorized",
        "You need basic auth to access this endpoint. Credentials can be found on the README."
    )
})

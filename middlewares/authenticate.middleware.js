// Importing necessary modules for authentication middleware
const jwt = require('jwt-simple');
const moment = require('moment');
// Loading environment variables from a .env file
require('dotenv').config();

// Middleware for user authentication using JSON Web Tokens (JWT)
exports.auth = (req, res, next) => {
    // Check if the request has an 'Authorization' header
    if (!req.headers.authorization) {
        // Return a 403 Forbidden status if the header is missing
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    // Extract the token from the 'Authorization' header and remove quotes
    const token = req.headers.authorization.replace(/['"]+/g, '');

    // Split the token into segments (header, payload, signature)
    const segments = token.split('.');

    // Check if the token has the expected number of segments (3)
    if (segments.length !== 3) {
        // Return a 403 Forbidden status if the token is invalid
        return res.status(403).send({ message: 'InvalidToken' });
    } else {
        try {
            // Decode the token using the secret key from the environment variables
            const payload = jwt.decode(token, process.env.JWT_SECRET);

            // Check if the token has expired
            if (payload.exp <= moment().unix()) {
                // Return a 403 Forbidden status if the token has expired
                return res.status(403).send({ message: 'TokenExpirado' });
            }

            // Attach the user payload to the request for use in subsequent middleware or routes
            req.user = payload;
        } catch (error) {
            // Return a 403 Forbidden status if the token decoding fails
            return res.status(403).send({ message: 'InvalidToken' });
        }
    }

    // Move to the next middleware or route handler
    next();
};

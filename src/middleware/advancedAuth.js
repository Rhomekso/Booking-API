import { auth } from 'express-oauth2-jwt-bearer';

const authMiddleware = auth({
    audience: 'bookings-api',
    issuerBaseURL: 'https://dev-g4i3az4f1vb3pzp4.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export default authMiddleware;
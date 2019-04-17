const expressJwt = require('express-jwt');
// const userService = require('./auth');

// module.exports = jwt;

// function jwt() {
//     const secret = process.env.DB_PASS;
//     return expressJwt({ secret, isRevoked }).unless({
//         path: [
//             // public routes that don't require authentication
//             'api/authenticate',
//             'api/register',
//             '/authenticate',
//             '/register',
//             'authenticate',
//             'register'
//         ]
//     });
// }
//
// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);
//     console.log('to be revoked', user);
//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }
//
//     done();
// };

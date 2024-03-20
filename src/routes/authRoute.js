// src/routes/auth.js
//const fastify = require('fastify')();
const {login,refreshToken} = require('../controllers/authController');
//const verifyJWT = require('../middleware/verifyJWT');


async function routes (fastify, options) {
  fastify.post('/api/auth/login', login);
  fastify.get('/api/auth/refresh', refreshToken);
  //fastify.get('/protected', { preValidation: [verifyJWT] }, authController.protected);
  //done();
}

module.exports = routes;


const verifyJWT = require('../middleware/verifyJWT');

async function routes (fastify, options, done) {
  
  //fastify.get('/protected', { preValidation: [verifyJWT] }, authController.protected);
  // done();
}

module.exports = routes;
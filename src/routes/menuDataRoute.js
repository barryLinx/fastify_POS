const menu = require("../controllers/menuDataController");

async function routes(fastify, options) {
  //fastify.get("/MenuData", menu);
  
  fastify.get(
    "/api/MenuData",
    {
      onRequest: [fastify.authenticate],
    },
    menu
  );

  // fastify.route({
  //   method: 'GET',
  //   url: '/MenuData',
  //   preValidation: [verifyJWT], // 使用中间件
  //   handler: menu
  // });

  //fastify.get('/protected', { preValidation: [verifyJWT] }, authController.protected);

  //done();
}

module.exports = routes;

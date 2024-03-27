const salesData = require("../controllers/salesController");
//const verifyJWT = require('../middleware/verifyJWT');

async function routes(fastify, options) {
    
  fastify.get(
    "/api/getSalesData",
    // {
    //   onRequest: [fastify.authenticate],
    // },
    salesData
  );

}
module.exports = routes;



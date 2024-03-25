
const {getUsersAll,postAddUser} = require("../controllers/settingController");

async function routes (fastify, options, ) {
  fastify.get('/api/usersRole', { onRequest: [fastify.authenticate], }, getUsersAll);
  fastify.post('/api/setUserRole', { onRequest: [fastify.authenticate], }, postAddUser);
}

module.exports = routes;
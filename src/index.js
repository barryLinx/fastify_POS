const fs = require('fs');
const fastify = require("fastify")({ 
  logger: true ,
  // https: {
  //   key: fs.readFileSync('E:/fastify-pos/localhost.key'),
  //   cert: fs.readFileSync('E:/fastify-pos/localhost.crt')
  // }
});
require("dotenv").config();
//const verifyJWT = require('./middleware/verifyJWT');

const authentication=require('./plugins/authentication');
const authRoutes = require("./routes/authRoute");
const menuDataRoute = require("./routes/menuDataRoute");
const salesDataRoute = require("./routes/salesRoute");
const setUserRoute = require("./routes/setUserRoute");

// 註冊插件 fastify-jwt , 解析 accessToken
fastify.register(require("@fastify/jwt"), {
  secret: process.env.ACCESS_TOKEN_SECRET,
});

 fastify.register(require('@fastify/cors'), {
  origin:['https://barrylinx.github.io','https://solidjs-pos-system.vercel.app',"https://solidjs-test-beta.vercel.app"],
  //credentials:true, //Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  
})

fastify.register(require("@fastify/cookie"));
//註冊 authentication 插件，例如fastify-jwt

fastify.register(authentication);
// 註冊路由
fastify.register(authRoutes);
fastify.register(menuDataRoute);
fastify.register(salesDataRoute);
fastify.register(setUserRoute);

fastify.get('/',async (request, reply) => {
  reply.send({ hello: 'world',message:"deploy success" });
});

////啟動 Fastify 伺服器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });

    const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();


module.exports = fastify;
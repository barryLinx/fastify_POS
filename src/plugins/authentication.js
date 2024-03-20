const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  // fastify.register(require("@fastify/jwt"), {
  //   secret: "supersecret"
  // })

  fastify.decorate("authenticate", async function (request, reply) {

    try {
      //console.log(request);
      const auth = request.headers.authorization;
      const accessToken = auth.split(" ")[1];
      //console.log("accessToken", accessToken);
      if (!accessToken) {
        reply
          .code(401)
          .send({ statusCode: 401, message: "Access Token not found" });
        return;
      }

      const req = await request.jwtVerify();
      console.log(req);
    } catch (err) {
      // console.log("err",err);
      // //console.log("",err);
      // console.log("code",err.code);
      // console.log("statusCode",err.statusCode)
      reply
        .code(401)
        .send({ statusCode: err.statusCode, errMessage:"AUTHORIZATION_TOKEN_EXPIRED" });
    }
  });
});

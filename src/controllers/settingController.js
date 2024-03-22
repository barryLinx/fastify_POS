// src/routes/userRoute.js
async function settingRoutes(fastify, options) {
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if (currentUserRole.role !== "admin") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }
  //fake userRole Data
  const userRole = [
    { username: "hello", role: "admin", password: "123456" },
    { username: "you", role: "employee", password: "123456" },
    { username: "qq", role: "employee", password: "123456" },
  ];
}

module.exports = settingRoutes;

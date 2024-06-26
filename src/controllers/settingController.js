// src/routes/userRoute.js
//const { readDb,writeDb } =require("../config/dbAccess");
const axios = require("axios");
const { VERCEL_JSON_DB } = process.env;

async function postAddUser(request, reply) {
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if (currentUserRole.role !== "admin" && currentUserRole.role !== "engineer") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }

  const {id,role} = request.body;
  console.log("user:", request.body);

  try {
    // patch 指修改 role
    await axios.patch(`${VERCEL_JSON_DB}/${id}`, {
      role: role,
    });
    //console.log("response status:", response.status);
    //console.log("data:", data);
    reply.code(201).send({ message: "userRole Change" });
  } catch (err) {
    //console.log("err:", err.response.status);
    if (err.response.status == 404) {
      reply
        .code(441)
        .send({ statusCode: 441, error: err.response.data });
      return;
    }
    reply.code(500).send({ error: "Internal Server Error" });
    return; // 中斷程式執行，不會執行reply.code(201).send({ message: "userRole Change" }); 這一行。
    // 中斷程式執行，不會執行reply.code(201).send({ message: "userRole Change" }); 這一行。
    // 因為reply.code(500).send({ error: "Internal Server Error" }); 這一行，會中斷程式執行。
    // 因為reply.code(500).send({ error: "Internal Server Error" }); 這一行，會中斷程式執行。
  }
}

async function getUsersAll(request, reply) {
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if (currentUserRole.role !== "admin" && currentUserRole.role !== "engineer") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }

  const response = await axios.get(`${VERCEL_JSON_DB}`);
  //console.log("response:", response.data);
  const data = response.data;

  const usersWithNoPassword = data.map(({ password, ...rest }) => rest);
  const users = usersWithNoPassword.filter((u)=>{
    return u.id !== "100";
  })

  console.log("users:", users);

  reply.send(users);
}

module.exports = { getUsersAll, postAddUser };

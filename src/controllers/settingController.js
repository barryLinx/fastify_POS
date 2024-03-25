// src/routes/userRoute.js
const { readDb,writeDb } =require("../config/dbAccess");

async function postAddUser(request, reply) {
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if (currentUserRole.role !== "admin" && currentUserRole.role !== "engineer") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }

  const { username, role } = request.body;
  const db = await readDb();
  // 找到要修改的對象
  const userToUpdate = db.userRole.find(user => user.username === username);

  if (!userToUpdate) {
    reply.code(404).send({ error: "User not found" });
    return;
  }

  // 更新用户的角色
  userToUpdate.role = role;
 

  //db.userRole.push({ username, role });
  await writeDb(db);
  reply.code(201).send({ message: "userRole Change" });
 
}

async function getUsersAll(request, reply){
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if (currentUserRole.role !== "admin" && currentUserRole.role !== "engineer") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }
  const db = await readDb();
  const usersWithNoPassword = db.userRole.map(({ password, ...rest }) => rest);
  reply.send(usersWithNoPassword);
}

module.exports = {getUsersAll,postAddUser};

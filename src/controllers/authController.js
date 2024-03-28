//const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken');
const { readDb,writeDb } =require("../config/dbAccess");
// 定義ACCESS_TOKEN_SECRET和REFRESH_TOKEN_SECRET
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

// 設定JWT有效期限
const JWT_EXPIRATION_ACCESS = "10m"; // Access Token過期時間
const JWT_EXPIRATION_REFRESH = "1h"; // Refresh Token過期時間

let refreshTokens = [];

// async function generateAccessToken(user)  {
//   return await fastifyJwt.jwt.sign({user}, {
//     secret: ACCESS_TOKEN_SECRET,
//     expiresIn: accessTokenExpiry,
//   });
// };

// async function generateRefreshToken(user) {
//   return await fastifyJwt.jwt.sign({user}, {
//     secret: REFRESH_TOKEN_SECRET,
//     expiresIn: refreshTokenExpiry,
//   });
// };


// 路由: 登入並生成Access Token和Refresh Token
async function login(request, reply) {
  // 假設這裡有一個驗證使用者的過程
  const { username, password } = request.body;

  const db = await readDb();
  const userRole = db.userRole;
  //console.log("userRole: ", userRole);
  let user = userRole.find(
    (user) => user.username === username && user.password === password
  );
  //console.log("user: ", user);
  if (!user) {
    reply.send({ statusCustom:4001,message: "帳號或密碼錯誤" });
    return;
  }
  // 一旦驗證成功，生成Access Token和Refresh Token
  const accessToken = this.jwt.sign(
    { username:user.username, role:user.role },
    { secret: ACCESS_TOKEN_SECRET, expiresIn: JWT_EXPIRATION_ACCESS }
  );
  const refreshToken = this.jwt.sign(
    { username:user.username, role:user.role },
    { secret: REFRESH_TOKEN_SECRET, expiresIn: JWT_EXPIRATION_REFRESH }
  );

  // 將Refresh Token加入refreshTokens陣列中
  refreshTokens.push(refreshToken);

  // 在HTTP Only的cookie中設定Refresh Token , 登入成功後回傳200狀態碼
  reply
    .setCookie("refreshToken", refreshToken, {
      //domain:"", // 當下網域
      path: "/api/auth/refresh", // refresh token路徑
      httpOnly: true,
      maxAge: 60 * 60, // 一小時
      //secure: false, // 僅在 HTTPS 中傳輸 cookie (send cookie over HTTPS only)
      sameSite: "None", // 防止CSRF攻擊 // Consider using 'Lax' for localhost development
    })
    .code(201)
    .send({ message: "登入成功", accessToken });

  //return { accessToken };
}

// 路由: 使用Refresh Token來獲取新的Access Token

async function refreshToken(request, reply) {
  const requestCookies = request.cookies;
  console.log("requestCookies: ", requestCookies);
  const refreshToken = request.cookies.refreshToken;
  console.log("refreshToken: ", refreshToken);
  // 若Refresh Token無效則會回傳401狀態碼，
  if (!refreshToken) {
    return reply.send({ statusCustom:4002, message: "未提供Refresh Token" });
  }

  try {
    // 驗證Refresh Token是否有效並解碼用戶名,若是 Refresh Token 無效則會拋出錯誤,若Refresh Token有效則會回傳新的Access Token。
    const decoded = await this.jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log("decoded: ", decoded);
    // 生成新的Access Token
    const accessToken = await this.jwt.sign(
      { username: decoded.username },
      { expiresIn: JWT_EXPIRATION_ACCESS }
    );
    return reply.send({
      accessToken,
      message: "Request processed successfully",
    });
    //return { accessToken };
  } catch (err) {
    reply.code(403).send({ message: "Refresh Token 驗證失效 ，重新登入" });
    return;
  }
}

// 輸出 login 和 refreshToken 方法
module.exports = { login, refreshToken };

//send error if there is no token or it's invalid
// if (!refreshTokens.includes(refreshToken)) {
//   // 重新導向 login 頁面
//   reply
//     .code(403)
//     .send({ statusCode: 403, message: "無效的Refresh Token" })
//     .redirect("/login");
//   //reply.code(403).send({ message: "無效的Refresh Token" });
//   return;
// }

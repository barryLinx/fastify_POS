// src/middleware/verifyJWT.js

const { ACCESS_TOKEN_SECRET } = process.env;

async function verifyJWT(req, reply) {
  // 假設 AccessToken 儲存在 cookies 中，你也可以根据实际情况修改獲取方式
  const accessToken = request.headers.authorization; 

  if (!accessToken) {
    reply.code(401).send({ message: 'Access Token not found' });
    return;
  }

  try {
    const decoded = this.jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.username = decoded;
   // done();
  } catch (error) {
    reply.code(401).send({ message: 'Invalid Access Token' });
    throw new Error('Invalid Access Token');
  }
}

module.exports = verifyJWT;

"use strict";
const fastify = require("../src/index");

module.exports = async (req, res) => {
  try {
    // 等待 Fastify 啟動成功，才能將 HTTP 請求轉發給 Fastify 伺服器
    await fastify.ready();
  //
  fastify.server.emit('request', req, res);
  } catch (error) {
    // 如果出现错误，返回错误信息
    res.status(500).send('Internal Server Error');
  }
};
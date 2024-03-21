"use strict";

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

const authentication=require('../src/plugins/authentication');
const authRoutes = require("../src/routes/authRoute");
const menuDataRoute = require("../src/routes/menuDataRoute");
const salesDataRoute = require("../src/routes/salesRoute");



// 註冊插件 fastify-jwt , 解析 accessToken
fastify.register(require("@fastify/jwt"), {
  secret: process.env.ACCESS_TOKEN_SECRET,
});

 fastify.register(require('@fastify/cors'), {
  origin:"http://localhost:8081",
  credentials:true,
  
})

fastify.register(require("@fastify/cookie"));
//註冊 authentication 插件，例如fastify-jwt

fastify.register(authentication);
// 註冊路由
fastify.register(authRoutes);
fastify.register(menuDataRoute);
fastify.register(salesDataRoute);

fastify.get('/',async (request, reply) => {
  reply.send({ hello: 'world',message:"deploy success" });
});

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
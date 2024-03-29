async function salesData(request, reply) {
  const currentUserRole = request.user;

  console.log("currentUserRole:", currentUserRole);

  if ( currentUserRole.role !== "admin" && currentUserRole.role !== "employee") {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }

  let dailySalesData = [];
  const randomName = [
    "義式咖啡拿鐵",
    "美式黑咖啡",
    "黑咖啡",
    "柳橙汁",
    "披薩",
    "奶油蛋糕",
    "鳳梨酥",
    "起士三明治",
    "南美洲蔓越莓汁",
    "花生三明治",
    "藍梅三明治",
    "智利蘋果汁",
    "義式咖啡拿鐵",
  ];

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (var i = 0; i < 1000; i++) {
    dailySalesData.push({
      name:randomName[getRndInteger(0, randomName.length - 1)],
      price: getRndInteger(35, 100),
      count: getRndInteger(1, 1000),
      payMethed: getRndInteger(1, 3),
      status: getRndInteger(1, 3),
    });
  }
  const data = 
    {
      daily: {
        customer: getRndInteger(1, 1000),
        sales: getRndInteger(0, 1000),
        volumeOfBusiness: getRndInteger(0, 100000000),
      },
      dailySales: dailySalesData,
    }
  ;
  //reply.header('Cache-Control', 'public, must-revalidate,max-age=3600');
  reply.code(200).send(data);
}

module.exports = salesData;

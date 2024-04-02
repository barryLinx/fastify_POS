async function menu(request, reply) {
  // const currentUserRole = request.user;

  // console.log("currentUserRole:", currentUserRole);

  // if ( currentUserRole.role !== "admin" && currentUserRole.role !== "employee") {
  //   reply.code(403).send({ error: "Forbidden" });
  //   return;
  // }

  let dailySalesData = [];
  const randomName = [
    "義式咖啡拿鐵",
    "美式黑咖啡",
    "黑咖啡",
    "柳橙汁",
    "香草披薩",
    "奶油蛋糕(2入)",
    "鳳梨酥(6入)",
    "土鳳梨酥(6入)",
    "起士三明治",
    "南美洲蔓越莓汁",
    "花生三明治",
    "藍梅三明治",
    "智利蘋果汁",
    "義式咖啡拿鐵",
    "巴西柳橙汁",
    "這是披薩",
    "草莓三明治",
  ];

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (var i = 0; i < 73; i++) {
    dailySalesData.push({
      id: i + 1,
      name: randomName[getRndInteger(0, randomName.length - 1)],
      price: getRndInteger(35, 200),
      categroy: getRndInteger(1, 6),
      imgUrl: "https://placehold.co/600x400",
      describe:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit,Lorem ipsum dolor sit amet consectetur adipisicing elit,Lorem ipsum dolor sit amet consectetur adipisicing elit",
    });
  }
 // reply.header("Cache-Control", "public,must-revalidate, max-age=3600");
  reply.code(200).send(dailySalesData);
}

module.exports = menu;

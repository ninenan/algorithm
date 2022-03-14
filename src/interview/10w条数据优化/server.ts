const http = require("http");
const port = 3000;

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      //设置允许跨域的域名，也可设置*允许所有域名
      "Access-Control-Allow-Origin": "*",
      //跨域允许的请求方法，也可设置*允许所有方法
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      //允许的header类型
      "Access-Control-Allow-Headers": "Content-Type",
    });

    let list = [];
    let num = 0;

    for (let index = 0; index < 10_000; index++) {
      num++;
      list.push({
        src: "https://p6-passport.byteacctimg.com/img/user-avatar/f4375f47ec12508c1bf6259b40e2cc4b~300x300.image",
        name: "nnn",
        id: num,
      });
    }
    res.end(JSON.stringify(list));
  })
  .listen(port, function () {
    console.log("port :>> ", port);
  });

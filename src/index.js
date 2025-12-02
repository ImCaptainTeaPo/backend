const http = require("http");
const { URL } = require("url");
const { getUsers } = require("./modules/users");

const HOST = "127.0.0.1";
// порт из окружения
const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);
  const params = url.searchParams;
  const keys = [...params.keys()];

  // 1) Если никаких параметров нет -> "Hello, World!"
  if (keys.length === 0) {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Hello, World!");
    return;
  }

  // 2) ?hello=<name>
  if (params.has("hello")) {
    const name = params.get("hello");

    // ?hello или ?hello=
    if (!name) {
      response.writeHead(400, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end("Enter a name");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Hello, ${name}.`);
    return;
  }

  // 3) ?users
  if (params.has("users") && keys.length === 1) {
    getUsers()
      .then((users) => {
        response.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        response.end(JSON.stringify(users));
      })
      .catch((error) => {
        console.error("Error reading users:", error);
        response.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end();
      });

    return;
  }

  // 4) Любые другие параметры -> пустой ответ, код 500
  response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  response.end();
});

// запуск сервера
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});

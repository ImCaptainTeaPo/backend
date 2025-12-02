const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const users = JSON.parse(data);
        resolve(users);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = { getUsers };

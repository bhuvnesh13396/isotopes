const fs = require("fs");

processFile = data => {
  const lines = data
    .toString()
    .split("\n")
    .splice(1, 20000);
  const contents = [];
  lines.forEach(line => contents.push(line.split(", ")));
  const users = [];
  contents.forEach(content => {
    const user = { index: content[0], interests: [] };
    for (let i = 0; i < 5; i++) {
      user.interests.push({
        name: content[i * 2 + 1],
        score: content[i * 2 + 2]
      });
    }
    users.push(user);
  });
  return users;
};

exports.getUsers = callback => {
  let results;
  fs.readFile("./users.csv", (err, data) => {
    if (err) callback([]);
    callback(processFile(data));
  });
};

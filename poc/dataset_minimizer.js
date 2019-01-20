const data = require("./prepare_data.js");
const intersects = require("./intersects.js");

data.getUsers(data => {
  let interests = [
    "Startup",
    "Technology",
    "Travel",
    "Entrepreneurship",
    "Sports"
  ];
  minimize_users(data, interests);
});

// In Progress
let minimize_users = (data, interests) => {
  let start = new Date().getTime();
  const intersection = intersects.intersectMultipleSets(data, interests);
  let end = new Date().getTime();
  console.log(end - start);
  console.log(intersection);
};

// let getCombinations = (numbers, depth, combinations) => {
//
// };

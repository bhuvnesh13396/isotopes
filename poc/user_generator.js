const fs = require("fs");

const medium_interests = [
  "Startup",
  "Life",
  "Politics",
  "Life Lessons",
  "Travel",
  "Entrepreneurship",
  "Poetry",
  "Health",
  "Education",
  "Love",
  "Design",
  "Music",
  "Writing",
  "Technology",
  "Business",
  "Self Improvement",
  "Social Media",
  "Sports",
  "Food",
  "Art"
];

let output =
  "index, " +
  "interest1, score1, " +
  "interest2, score2, " +
  "interest3, score3, " +
  "interest4, score4, " +
  "interest5, score5\n";

for (let i = 0; i < 20000; i++) {
  output = output + i;
  let list = [];
  for (let j = 0; j < 5; j++) {
    let interest = medium_interests[parseInt(Math.random() * 20000) % 20];
    while (list.includes(interest))
      interest = medium_interests[parseInt(Math.random() * 20000) % 20];
    let score = parseInt(Math.random() * 100);
    list.push(interest);
    output = output + ", " + interest + ", " + score;
  }
  output = output + "\n";
}

fs.writeFile("./users.csv", output, function(err) {
  if (err) return console.log(err);
});

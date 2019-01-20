let getFilteredUserSetByInterest = (data, key) => {
  return new Set(getUserIndexSetByInterest(data, key).map(user => user.index));
};

let getUserIndexSetByInterest = (data, key) => {
  return data.filter(
    user => user.interests.filter(interest => interest.name === key).length > 0
  );
};

let intersect = (a, b) => new Set([...a].filter(x => b.has(x)));

let intersectMultipleSets = (data, interests) => {
  let intersection = new Set(data.map(user => user.index));
  interests.forEach(interest => {
    intersection = intersect(
      intersection,
      getFilteredUserSetByInterest(data, interest)
    );
  });
  return intersection;
};

exports.intersectMultipleSets = intersectMultipleSets;

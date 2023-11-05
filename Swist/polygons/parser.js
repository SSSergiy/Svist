var parsedJSON = require("./polygons.json");

const colors = {
  orange: "#FE7B01",
  red: "#ef4e4e",
  yellow: "#ffd400",
  black: "#757677",
  grey: "#B6B6B6",
  white: "#ffffff",
  blue: "#82a7ff",
};

const parseOrange = (_val) => {
  return _val.filter((val) => val.color === colors.orange);
};
const parseBlack = (_val) => {
  return _val.filter((val) => val.color === colors.black);
};
const parseMedium = (_val) => {
  return _val.filter(
    (val) => val.color !== colors.orange && val.color !== colors.blue
  );
};
const parseParking = (_val) => {
  return _val.filter(
    (val) => val.color !== colors.orange && val.color === colors.blue
  );
};

const setHoles = (_val) => {
  let holes = [];
  _val.map((val) => {
    if (val.color === "#FE7B01") {
      holes.push(val.polygon);
    }
  });
  return holes;
};

export { parseOrange, setHoles, parseBlack, parseMedium, parseParking };

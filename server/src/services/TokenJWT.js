const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  return jwt.sign( {id} , process.env.ACCESS_TOKEN_KEY, { expiresIn: "300s" });
};

const createRefreshToken = (id) => {
  return jwt.sign({id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1y" });
};

module.exports = {createRefreshToken, createAccessToken};
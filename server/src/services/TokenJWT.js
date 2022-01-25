const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  return jwt.sign({ id }, "My access token secret key", { expiresIn: "30s" });
};

const createRefreshToken = (user) => {
  return jwt.sign({ id }, "My refresh token secret key", { expiresIn: "1y" });
};

module.exports = {createRefreshToken, createAccessToken};
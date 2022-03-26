const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userID) => {
      if (error) {
        return res
          .status(403)
          .json({ error: error.message, err: "Token is not valid!" });
      }
      console.log(userID);
      if (req.params.id == userID.id) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You are not authorized for this...!" });
      }
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

module.exports = verify;

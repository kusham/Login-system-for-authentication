const jwt = require('jsonwebtoken');


const verify = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(token) {
        jwt.verify(token, "My secret key", (error, decodeUser) => {
            if (error) {
                return res.status(403).json({error: error.message , err: "Token is not valid!"});
              }
        
              req.user = decodeUser;
              next();
        })
    } else {
        res.status(401).json("You are not authenticated!");
      }
};

module.exports = verify;
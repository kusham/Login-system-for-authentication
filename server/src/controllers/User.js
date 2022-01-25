const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const errorHandling = require("../validations/passwordMatch");
const { createAccessToken, createRefreshToken } = require("../services/TokenJWT");

let refreshTokens = [];

module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  errorHandling.isPasswordMatch(password, confirmPassword);
  errorHandling.isUserExists(email);

  const user = new userSchema({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    const savedUser = await user.save();

    const accessToken = createAccessToken(savedUser._id);
    const refreshToken = createRefreshToken(savedUser._id);
    refreshTokens.push(refreshToken);

    res
      .status(200)
      .json({
        savedUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  } catch (error) {
    next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const oldUser = await userSchema.findOne({ email: email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    //console.log(oldUser[0].password);
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const accessToken = createAccessToken(oldUser._id);
    const refreshToken = createRefreshToken(oldUser._id);
    refreshTokens.push(refreshToken);

    res
      .status(200)
      .json({ oldUser, accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    if (req.user.id === id) {
      await userSchema.findByIdAndDelete(id);
      res.json({ message: "User deleted successfully." });
    } else {
      res.status(403).json("You are not allowed to delete this user!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports.refresh = (res, req) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "My refresh token secret key", (err, userID) => {
    if(err) return res.status(403).json({error: err.message})
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(userID);
    const newRefreshToken = generateRefreshToken(userID);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
}
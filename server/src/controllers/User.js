const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
} = require("../services/TokenJWT");

module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if (!(password === confirmPassword)) {
      return res.status(200).json({ error: "Password does not match" });
    }

    const existsUser = await userSchema.findOne({ email: email });

    if (existsUser) {
      return res.status(400).json({ error: "This user already exists " });
    }

    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);

    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: encryptPassword,
    });
    const savedUser = await user.save();

    const accessToken = createAccessToken(savedUser._id);
    const refreshToken = createRefreshToken(savedUser._id);

    await userSchema.updateOne(
      { _id: savedUser._id },
      { $set: { refreshToken: refreshToken } }
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({
      savedUser,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.signIn = async (req, res) => {
  console.log(req);
  console.log(req.headers);
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(403)
      .json({ error: "Please provide an email and password" });
  }

  try {
    const oldUser = await userSchema.findOne({ email: email });
    if (!oldUser) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    const accessToken = createAccessToken(oldUser._id);
    const refreshToken = createRefreshToken(oldUser._id);
    await userSchema.updateOne(
      { _id: oldUser._id },
      { $set: { refreshToken: refreshToken } }
    );

   // res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({
      message: "You are log In",
      user: {
        firstName: oldUser.firstName,
        lastName: oldUser.lastName,
        email: oldUser.email,
      },
      accessToken: accessToken,
      refreshToken: refreshToken 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteUser = async (res, req) => {
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

module.exports.refresh = async (res, req) => {
  const refreshToken = req.body.token;

  try {
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "You are not authenticated! Please log In" });
    }

    if (!(await userSchema.findOne({ refreshToken: refreshToken }))) {
      return res.status(403).json({ message: "Refresh token is not valid!" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      async (err, userID) => {
        if (err) return res.status(403).json({ error: err.message });

        const newAccessToken = generateAccessToken(userID.id);
        const newRefreshToken = generateRefreshToken(userID.id);

        await userSchema.updateOne(
          { _id: userID.id },
          { $set: { refreshToken: newRefreshToken } }
        );

        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        res.status(200).json({
          accessToken: newAccessToken,
        });
      }
    );
  } catch (error) {
    res.status(403).json({ error: err.message });
  }
};

module.exports.logOut = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await userSchema.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );
    res.status(201).json({ message: "Successfully log out..!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

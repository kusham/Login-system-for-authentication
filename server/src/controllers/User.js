const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new userSchema({
    firstName,
    lastName,
    email,
    password:encryptedPassword,
    confirmPassword:encryptedPassword
  });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userSchema.findOne({ email: email });
    if (!oldUser) return res.status(404).json("User does not exists");

    //console.log(oldUser[0].password);
   const match = await bcrypt.compare(password, oldUser.password);
   if(!match)
     return res.status(404).json("wrong credentials")

     // console.log();
    res.status(200).json(oldUser);
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
};

const userSchema = require("../models/UserModel");

const encryptPassword = (password) => {
  userSchema.prependListener('save', async function(next) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
    next();
  })
};

module.exports = {encryptPassword};
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter the name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter the email"],
      validate: [validator.isEmail, "Please enter the valid email"],
      // match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //     "Please provide a valid email"]
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      minlength: [6, "password should be contain at least 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.prependListener("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", userSchema);

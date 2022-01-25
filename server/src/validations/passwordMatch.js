const userSchema = require("../models/UserModel");

const isPasswordMatch = (password, confirmPassword) => {
    if (!(password === confirmPassword)) {
        return next(new ErrorResponse("Password does not match", 400));
    }
}

const isUserExists = async (email) => {
    const existsUser = await userSchema.findOne({email: email});

    if(existsUser) {
        return next(new ErrorResponse("This user already exists ", 400));
    }
}

module.exports = {isPasswordMatch, isUserExists};
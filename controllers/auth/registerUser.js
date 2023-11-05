const { User } = require("../../models");
const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")
const {HttpError} = require("../../helpers")
require("dotenv").config();

const {BASE_URL} = process.env;

const registerUser = async (rq, rs) => {
    const { email, password } = rq.body
    
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid();

    const newUser = await User.create({...rq.body, password: hashPassword, avatarURL, verificationToken});


    rs.status(201).json({
        status: "Success",
        code: 200,
        data: {
            name: newUser.name,
            email: newUser.email,
            avatarURL,
            confirm_email: `${BASE_URL}/api/users/verify/${verificationToken}`
        },
    })
}

module.exports = registerUser

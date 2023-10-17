const { User } = require("../../models");
const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")
const {HttpError} = require("../../helpers")
const {sendEmail} = require("../../service")
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

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<p>Congratulations, you have registered on our ad service, all you have to do is confirm your email</p> <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    }

    await sendEmail(verifyEmail)

    rs.status(201).json({
        status: "Success",
        code: 200,
        user: {
            name: newUser.name,
            email: newUser.email,
            avatarURL,
        },
    })
}

module.exports = registerUser

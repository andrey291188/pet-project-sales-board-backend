const { User } = require("../../models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {HttpError} = require("../../helpers")

const {SECRET_KEY} = process.env

const loginUser = async (rq, rs) => {
    const {email, password} = rq.body
    const user = await User.findOne({email});

    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError (401, "Email not verified")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token =jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    rs.json({
        status: "Success",
        code: 200,
        token,
        data: {
            name: user.name,
            email: user.email,
            avatar: user.avatarURL
        }
    })
}

module.exports = loginUser
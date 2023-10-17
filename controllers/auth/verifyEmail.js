const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async (rq, rs) => {
    const {verificationToken} = rq.params;
    const user = await User.findOne({verificationToken})
    if (!user) {
        throw HttpError(404, "User not found")
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

    rs.json({
        message: "Verification successful"
    })
}

module.exports = verifyEmail
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (rq, rs) => {
  const { email } = rq.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  rs.json({
    message: "Verification email sent",
    confirm_email: `${BASE_URL}/api/users/verify/${user.verificationToken}`,
  });
};

module.exports = resendVerifyEmail;

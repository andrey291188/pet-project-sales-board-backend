const { HttpError } = require("../../helpers");
const {sendEmail} = require("../../service")
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

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  rs.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;

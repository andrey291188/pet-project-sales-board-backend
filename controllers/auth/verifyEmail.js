const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async (rq, rs) => {
  const { verificationToken } = rq.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  rs.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to the ad service</title>
    </head>
    <body style="background: #243b55; padding-top: 160px; padding-bottom: 160px;">
    <div style="border-radius: 10px; box-shadow: 0 15px 25px rgba(0,0,0,.6); box-sizing: border-box; background: rgba(0,0,0,.5); padding: 30px; margin-left: auto; margin-right: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 80%;">
        <h1 style="color: #fff; text-align: center; font-size: 30px;">Congratulations</h1>
        <p style="color: #fff; text-align: center; font-size: 20px;">You have successfully completed registration</p>
        </div>
      </body>
    </html>
  `);
};

module.exports = verifyEmail;

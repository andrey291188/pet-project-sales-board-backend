const { User } = require("../../models");

const logoutUser = async (rq, rs) => {
    const {_id} = rq.user;
    await User.findByIdAndUpdate(_id, { token: null });
  
    rs.json({
      status: "Success",
      code: 204,
      message: "Logout success",
    });
}

module.exports = logoutUser
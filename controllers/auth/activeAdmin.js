const { User } = require("../../models");

const {ADMIN_PASSWORD} = process.env

const activeAdmin = async (rq, rs) => {
    const {_id} = rq.user;
    const { adminAccess, passwordAdmin } = rq.body
  
    if(passwordAdmin !== ADMIN_PASSWORD) {
        throw HttpError(401, "No access")
    }
    
    await User.findByIdAndUpdate(_id, { adminAccess });
  
    rs.json({
      status: "Success",
      code: 200,
      message: `Administrator access ${adminAccess}`,
    });
}

module.exports = activeAdmin
const {User} = require("../../models")

const getAllUsers = async (rq, rs) => {
    const { adminAccess } = rq.user

    if (!adminAccess) {
        throw HttpError(403, "Forbidden")
    }

    const userList = await User.find({})

    rs.json({
        status: "Success",
        code: 200,
        data: {
            result: userList
        },
    });
};

module.exports = getAllUsers
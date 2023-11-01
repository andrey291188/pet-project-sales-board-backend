const {User} = require("../../models")

const getAllUsers = async (rq, rs) => {
    const { adminAccess } = rq.user

    if (!adminAccess) {
        throw HttpError(403, "Forbidden")
    }

    const userList = await User.find({adminAccess: false}, "-adminAccess -password -token -verify -verificationToken -createdAt")

    rs.json({
        status: "Success",
        code: 200,
        data: {
            result: userList
        },
    });
};

module.exports = getAllUsers
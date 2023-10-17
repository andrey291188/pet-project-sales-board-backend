const { ctrlWrapper } = require("../../helpers")

const getCurrent = require("./getCurrent")
const loginUser = require("./loginUser")
const logoutUser = require("./logoutUser")
const registerUser = require("./registerUser")
const resendVerifyEmail = require("./resendVerifyEmail")
const updateAvatar = require("./updateAvatar")
const verifyEmail = require("./verifyEmail")
const activeAdmin = require("./activeAdmin")
const getAllUsers = require("./getAllUsers")
const deleteUser = require("./deleteUser")

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    loginUser: ctrlWrapper(loginUser),
    logoutUser: ctrlWrapper(logoutUser),
    registerUser: ctrlWrapper(registerUser),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    activeAdmin: ctrlWrapper(activeAdmin),
    getAllUsers: ctrlWrapper(getAllUsers),
    deleteUser: ctrlWrapper(deleteUser),
}

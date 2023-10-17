const activeAdsSchema = require("./activeAdsSchema");
const adsValidationSchema = require("./adsValidationSchema");
const emailVerifySchema = require("./emailVerifySchema");
const userAdminSchema = require("./userAdminSchema");
const userValidationSchema = require("./userValidationSchema");
const viewsSchema = require("./viewsSchema");
const loginUserSchema  = require("./loginUserSchema")

module.exports = {
    activeAdsSchema,
    adsValidationSchema,
    emailVerifySchema,
    userAdminSchema,
    userValidationSchema,
    viewsSchema,
    loginUserSchema,
}
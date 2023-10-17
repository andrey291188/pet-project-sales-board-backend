const { ctrlWrapper } = require("../../helpers")

const getAllBuyer = require("./getAllBuyer");
const getAllSales = require("./getAllSales");
const getAllSeller = require("./getAllSeller");
const getBuy = require("./getBuy")

module.exports = {
    getAllBuyer: ctrlWrapper(getAllBuyer),
    getAllSales: ctrlWrapper(getAllSales),
    getAllSeller: ctrlWrapper(getAllSeller),
    getBuy: ctrlWrapper(getBuy),
}
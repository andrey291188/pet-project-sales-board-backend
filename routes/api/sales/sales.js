const express = require("express");
const { authenticate } = require("../../../middlewares");

const {salesCtrl: ctrl} = require("../../../controllers")

const router = express.Router();

router.get("/", authenticate, ctrl.getAllSales)

router.get("/buy/:adsId", authenticate, ctrl.getBuy)

router.get("/buyer", authenticate, ctrl.getAllBuyer)

router.get("/seller", authenticate, ctrl.getAllSeller)

module.exports = router
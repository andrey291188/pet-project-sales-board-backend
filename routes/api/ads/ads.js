const express = require("express");

const {adsCtrl: ctrl} = require("../../../controllers")

const { authenticate, validateBody, isValidId, upload } = require("../../../middlewares");
const { adsValidationSchema } = require("../../../schemas");

const router = express.Router();

router.get("/", ctrl.getAllAds)

router.get("/allForUser", authenticate, ctrl.getAllAdsUser)

router.get("/:adsId", authenticate, isValidId, ctrl.getAdsById)

router.post("/", authenticate, validateBody(adsValidationSchema), ctrl.postCreateAds);

router.patch("/:adsId/fotoAds", authenticate, isValidId, upload.array("fotoAds", 4), ctrl.patchFotoAdsAdd)

router.put("/:adsId", authenticate, isValidId, validateBody(adsValidationSchema), ctrl.putUpdateAdsId);

router.delete("/:adsId", authenticate, isValidId, ctrl.deletedAdsId);

router.patch("/reset-views/:adsId", authenticate, isValidId, ctrl.patchResetViewsAds);

router.patch("/active/:adsId", authenticate, isValidId, ctrl.patchActiveAds);



module.exports = router
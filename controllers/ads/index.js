const { ctrlWrapper } = require("../../helpers")

const putUpdateAdsId = require("./putUpdateAdsId")
const postCreateAds = require("./postCreateAds")
const patchResetViewsAds = require("./patchResetViewsAds")
const patchActiveAds = require("./patchActiveAds")
const getAllAds = require("./getAllAds")
const getAllAdsUser = require("./getAllAdsUser")
const getAdsById = require("./getAdsById")
const deletedAdsId = require("./deletedAdsId")
const patchFotoAdsAdd = require("./patchFotoAdsAdd")
const getAllAdsUserById = require("./getAllAdsUserById")

module.exports = {
    putUpdateAdsId: ctrlWrapper(putUpdateAdsId),
    postCreateAds: ctrlWrapper(postCreateAds),
    patchResetViewsAds: ctrlWrapper(patchResetViewsAds),
    patchActiveAds: ctrlWrapper(patchActiveAds),
    getAllAds: ctrlWrapper(getAllAds),
    getAdsById: ctrlWrapper(getAdsById),
    deletedAdsId: ctrlWrapper(deletedAdsId),
    getAllAdsUser: ctrlWrapper(getAllAdsUser),
    patchFotoAdsAdd: ctrlWrapper(patchFotoAdsAdd),
    getAllAdsUserById: ctrlWrapper(getAllAdsUserById)
}
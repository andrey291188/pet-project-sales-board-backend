const { Ads } = require("../../models");
const { HttpError } = require("../../helpers");
const deleteImage = require("../../helpers/deleteImage");


const deletedAdsId = async (rq, rs) => {
    const { adsId } = rq.params;

    const deleteContact = await Ads.findByIdAndRemove(adsId);
    const {fotoAds} = deleteContact;

    if (fotoAds.length) {
      fotoAds.forEach(url => {
        deleteImage(url)
      });
    }

    if (!deleteContact) {
      throw HttpError(404, "Not Found");
    }
  
    rs.json({
      status: "ads deleted",
      code: 200,
      data: {
        result: deleteContact,
      },
    })

}

module.exports = deletedAdsId
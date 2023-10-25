const { Ads } = require("../../models");
const { HttpError } = require("../../helpers");

const patchActiveAds = async (rq, rs) => {
    const { adsId } = rq.params;
    const { active: updateActive } = await Ads.findById(adsId)
   
    const adsUpdate = await Ads.findByIdAndUpdate(adsId, {active: !updateActive}, {new: true});

    if (!adsUpdate) {
      throw HttpError(404, "Not found");
    }
    rs.json({
      status: "Success",
      code: 200,
      data: {
        result: adsUpdate,
      },
    });
}

module.exports = patchActiveAds
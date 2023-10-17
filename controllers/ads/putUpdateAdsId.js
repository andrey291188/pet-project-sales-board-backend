const { Ads } = require("../../models");
const { HttpError } = require("../../helpers");

const putUpdateAdsId = async (rq, rs) => {
    const { adsId } = rq.params;

    const adsUpdate = await Ads.findByIdAndUpdate(adsId, {...rq.body}, {new: true, runValidators: true});
    
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

module.exports = putUpdateAdsId
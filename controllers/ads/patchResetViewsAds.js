const { Ads } = require("../../models");
const { HttpError } = require("../../helpers");

const patchResetViewsAds = async (rq, rs) => {
  const { adsId } = rq.params;
  const { views } = rq.body;
  
  const adsUpdate = await Ads.findByIdAndUpdate(
    adsId,
    { views },
    { new: true }
  );
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
};

module.exports = patchResetViewsAds;

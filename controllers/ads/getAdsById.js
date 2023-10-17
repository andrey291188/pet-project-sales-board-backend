const { Ads } = require("../../models");
const { HttpError } = require("../../helpers");

const getAdsById = async (rq, rs) => {
    const { adsId } = rq.params;
    const ads = await Ads.findById(adsId).populate("owner", "name email phone");

    if (!ads) {
      throw HttpError(404, "Not Found");
    }
    
    const currentViews = ads.views;
    const newViews = currentViews + 1;
    ads.views = newViews;
    await ads.save();
  
    rs.json({
      status: "Success",
      code: 200,
      data: {
        result: ads,
      },
    });
}

module.exports = getAdsById
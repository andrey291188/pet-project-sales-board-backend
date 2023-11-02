const { Ads } = require("../../models");

const getAllAds = async (rq, rs) => {

  const request =
    rq.query.q === undefined || rq.query.q === ""
      ? null
      : rq.query.q.toLowerCase();

  const regex = new RegExp(request, "i");

  const { page = 1, limit = 12 } = rq.query;
  const skip = (page - 1) * limit;

  let adsList = null;
  let totalAdsCount = null

  if (request !== null) {
    totalAdsCount = await Ads.countDocuments({ active: true, title: { $regex: regex } })
    adsList = await Ads.find(
      { active: true, title: { $regex: regex } },
      "-createdAt -updateAt",
      {
        skip,
        limit,
      }
    );
  } else {
    totalAdsCount = await Ads.countDocuments({ active: true })
    adsList = await Ads.find({ active: true }, "-createdAt -updateAt",
    {
      skip,
      limit,
    });
  }


  rs.json({
    status: "Success",
    code: 200,
    data: {
      result: adsList,
      totalAds: totalAdsCount,
    },
  });
};

module.exports = getAllAds;

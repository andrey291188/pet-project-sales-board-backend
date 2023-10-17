const { Ads } = require("../../models");

const getAllAds = async (rq, rs) => {
  const favoriteQuery = rq.query.favorite;

  const { page = 1, limit = 10 } = rq.query;
  const skip = (page - 1) * limit;

  const adsList =
    favoriteQuery !== undefined
      ? await Ads.find({ favorite: favoriteQuery }, "-createdAt -updateAt", {
          skip,
          limit,
        })
      : await Ads.find({}, "-createdAt -updateAt");

 

  rs.json({
    status: "Success",
    code: 200,
    data: {
      result: adsList,
    },
  });
};

module.exports = getAllAds;

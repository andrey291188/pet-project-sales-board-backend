const { Ads } = require("../../models");

const getAllAdsUserById = async (rq, rs) => {
    const { userId: owner } = rq.params;
    const favoriteQuery = rq.query.favorite;
  
    const { page = 1, limit = 10 } = rq.query;
    const skip = (page - 1) * limit;
  
    const adsList =
      favoriteQuery !== undefined
        ? await Ads.find(
            { owner, favorite: favoriteQuery },
            "-createdAt -updateAt",
            { skip, limit }
          ).populate("owner", "name email phone")
        : await Ads.find({ owner }, "-createdAt -updateAt").populate("owner", "name email phone");
  
    rs.json({
      status: "Success",
      code: 200,
      data: {
        result: adsList,
      },
    });
}

module.exports = getAllAdsUserById
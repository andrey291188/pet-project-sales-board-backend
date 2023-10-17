const { Ads } = require("../../models");


const postCreateAds = async (rq, rs) => {
 
    const {_id: owner} = rq.user;

    const addAds = await Ads.create({...rq.body, owner});

    rs.status(201).json({
      status: "Success",
      code: 201,
      data: {
        result: addAds,
      },
    })
}

module.exports = postCreateAds
const { Ads, Sales } = require("../../models");

const getBuy = async (rq, rs) => {
  const { adsId } = rq.params;
  
  const {
    name: buyer_name,
    email: buyer_email,
    phone: buyer_phone,
    _id: buyer_id,
  } = rq.user;
 
  const {
    title,
    price,
    owner: {
      name: seller_name,
      email: seller_email,
      phone: seller_phone,
      _id: seller_id,
    },
  } = await Ads.findById(adsId).populate("owner", "name email phone");

  const transaction = {
    buyer_id,
    buyer_name,
    buyer_email,
    buyer_phone,
    seller_id,
    seller_name,
    seller_email,
    seller_phone,
    title,
    price,
  };

  const addTransaction = await Sales.create({ ...transaction });

  rs.status(201).json({
    status: "Success",
    code: 201,
    data: {
      result: addTransaction,
    },
  });
};

module.exports = getBuy;

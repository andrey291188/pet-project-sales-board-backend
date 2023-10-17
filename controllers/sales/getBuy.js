const { Ads, Sales } = require("../../models");
const { sendEmail } = require("../../service");

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

  const sellerMail = {
    to: seller_email,
    subject: "Congratulations on your order",
    html: `<p>Congratulations, your ${title} has been purchased, contact the ${buyer_name} by writing a letter ${buyer_email} or calling him ${buyer_phone}</p>`,
  };
  const buyerMail = {
    to: buyer_email,
    subject: "Congratulations, you have successfully placed your order",
    html: `<p>You have successfully ordered a ${title} from the seller's ${seller_name}, for a faster transaction you can call him ${seller_phone} or write ${seller_email}</p>`,
  };

  await sendEmail(sellerMail);
  await sendEmail(buyerMail);

  rs.status(201).json({
    status: "Success",
    code: 201,
    data: {
      result: addTransaction,
    },
  });
};

module.exports = getBuy;

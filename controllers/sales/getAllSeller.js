const { Sales } = require("../../models");

const getAllSeller = async (rq, rs) => {
    const {_id: seller_id} = rq.user;
    
    const salesList = await Sales.find({seller_id})

    rs.json({
        status: "Success",
        code: 200,
        data: {
            result: salesList
        },
    });
}

module.exports = getAllSeller
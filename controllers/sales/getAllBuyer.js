const { Sales } = require("../../models");

const getAllBuyer = async (rq, rs) => {
    const {_id: buyer_id} = rq.user;
    
    const salesList = await Sales.find({buyer_id})

    rs.json({
        status: "Success",
        code: 200,
        data: {
            result: salesList
        },
    });
}

module.exports = getAllBuyer
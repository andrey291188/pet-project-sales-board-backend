const { Sales } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllSales = async (rq, rs) => {
    const { adminAccess } = rq.user
    
    if (!adminAccess) {
        throw HttpError(403, "Forbidden")
    }

    const salesList = await Sales.find({})

    rs.json({
        status: "Success",
        code: 200,
        data: {
            result: salesList
        },
    });

}

module.exports = getAllSales
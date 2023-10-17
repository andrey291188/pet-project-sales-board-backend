const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../../helpers");

const salesSchema = new Schema({
    buyer_id: {
        type: String,
        required: true,
    },
    buyer_name: {
        type: String,
        required: true,
    },
    buyer_email: {
        type: String,
        required: true,
    },
    buyer_phone:{
        type: Number,
        required: true,
    },
    seller_id: {
        type: String,
        require: true,
    },
    seller_name: {
        type: String,
        required: true,
    },
    seller_email: {
        type: String,
        required: true,
    },
    seller_phone:{
        type: Number,
        required: true,
    }, 
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {versionKey: false, timestamps: true});

salesSchema.post("save", handleMongooseError);

const Sales = model("sale", salesSchema)

module.exports = Sales
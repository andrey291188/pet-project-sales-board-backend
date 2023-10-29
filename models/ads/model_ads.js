const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../../helpers");

const adsSchema = new Schema({
    
    title: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    fotoAds: {
        type: Array,
        default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    
}, {versionKey: false, timestamps: true,});

adsSchema.post("save", handleMongooseError)

const Ads = model("ads", adsSchema)

module.exports = Ads
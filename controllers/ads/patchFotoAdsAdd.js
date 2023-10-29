const { Ads } = require("../../models");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { HttpError } = require("../../helpers");
const deleteImage = require("../../helpers/deleteImage");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET_CLOUD } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUD,
  api_secret: API_SECRET_CLOUD,
});

const adsDir = path.join(__dirname, "../../", "public", "adsFoto");

const patchFotoAdsAdd = async (rq, rs) => {
  const { adsId } = rq.params;
  const {fotoAds} = await Ads.findById(adsId)
 

  if ( fotoAds !== null ) {
    fotoAds.forEach(url => {
      deleteImage(url)
    });
  }

  const fotoAdsPromises = rq.files.map(async (file) => {
    const { path: tempUpload, originalname } = file;
    const fileName = `${adsId}_${originalname}`;
    const resultUpload = path.join(adsDir, fileName);
  
    const image = await Jimp.read(tempUpload);
    await image.resize(450, 500);
    await image.writeAsync(resultUpload);
    await fs.unlink(tempUpload);
  
    const fotoAdsPath = path.join(__dirname, "../../public/adsFoto", fileName);
   
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fotoAdsPath, async function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
          await fs.unlink(fotoAdsPath)
        }
      });
    });
  });
  
  Promise.all(fotoAdsPromises)
    .then(async (fotoAdsUrls) => {
      const adsUpdate = await Ads.findByIdAndUpdate(adsId, { fotoAds: fotoAdsUrls });
    
      rs.json({
        status: "Success",
        code: 200,
        data: {
          result: fotoAdsUrls,
        },
      });
    })
    

            // Example code for one image
  
  // const { path: tempUpload, originalname } = rq.file;
  // const fileName = `${adsId}_${originalname}`;

  // const resultUpload = path.join(adsDir, fileName);

  // const image = await Jimp.read(tempUpload);
  // await image.resize(450, 500);
  // await image.writeAsync(resultUpload);

  // await fs.unlink(tempUpload);

  // const fotoAdsPath = path.join(__dirname, "../../public/adsFoto", fileName);

  // cloudinary.uploader.upload(fotoAdsPath, async function (error, result) {
  //   if (error) {
  //     throw HttpError(404, "Not found");
  //   } else {
  //     const fotoAds = result.url;
  //     const adsUpdate = await Ads.findByIdAndUpdate(adsId, { fotoAds });
      
  //     if (!adsUpdate) {
  //       throw HttpError(404, "Not found");
  //     }
      
  //     await fs.unlink(fotoAdsPath);
    
  //     rs.json({
  //       status: "Success",
  //       code: 200,
  //       data: {
  //         result: fotoAds,
  //       },
  //     });
  //   }
  // });
};

module.exports = patchFotoAdsAdd;

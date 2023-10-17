const { User } = require("../../models");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { HttpError } = require("../../helpers");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET_CLOUD } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUD,
  api_secret: API_SECRET_CLOUD,
});

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (rq, rs) => {
  const { _id } = rq.user;

  const { path: tempUpload, originalname } = rq.file;
  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, fileName);

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250);
  await image.writeAsync(resultUpload);

  await fs.unlink(tempUpload);

  const avatarPath = path.join(__dirname, "../../public/avatars/", fileName);

  cloudinary.uploader.upload(avatarPath, async function (error, result) {
    if (error) {
      throw HttpError(404, "Not found");
    } else {
      const avatarURL = result.url;
      const userUpdate = await User.findByIdAndUpdate(_id, { avatarURL });
      if (!userUpdate) {
        throw HttpError(404, "Not found");
      }
      await fs.unlink(avatarPath);
    
      rs.json({
        avatarURL,
      });
    }
  });

 
};

module.exports = updateAvatar;

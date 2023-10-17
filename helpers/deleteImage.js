const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET_CLOUD } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUD,
  api_secret: API_SECRET_CLOUD,
});

const deleteImage = (urlImage) => {
    const cloudUrl = urlImage.includes("http://res.cloudinary.com/")
    
    if(cloudUrl) {
        const parts = urlImage.split("/");
        const publicId = parts[parts.length - 1].slice(0, -4)
        
        cloudinary.uploader.destroy(publicId);
      } else {

        return

      }

}

module.exports = deleteImage
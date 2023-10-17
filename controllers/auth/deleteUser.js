const { User, Ads } = require("../../models");
const { HttpError } = require("../../helpers");
const deleteImage = require("../../helpers/deleteImage");

const deleteUser = async (rq, rs) => {
  const { adminAccess } = rq.user;
  const { userId: _id } = rq.params;

  const owner = _id;

  if (!adminAccess) {
    throw HttpError(403, "Forbidden");
  }

  const userDelete = await User.findByIdAndRemove({ _id });
  const {avatarURL} = userDelete;
  
  deleteImage(avatarURL)

  if (!userDelete) {
    throw HttpError(404, "Not Found");
  }

  const userAdsList = await Ads.find({ owner }, "-createdAt -updateAt");

  userAdsList.map(async ({ _id, fotoAds }) => {
    await Ads.findByIdAndRemove(_id);
    if (fotoAds.length) {
      fotoAds.forEach(url => {
        deleteImage(url)
      });
    }; 
  });

  if (!userAdsList) {
    throw HttpError(404, "Not Found");
  }

  rs.json({
    status: "Success",
    code: 200,
    data: {
      userDelete,
      userAdsList,
    },
  });
};

module.exports = deleteUser;

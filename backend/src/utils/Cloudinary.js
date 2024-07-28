const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadSingleOnCloudinary = async (localFilePath) => {
  // Upload an image

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const uploadMultipleOnCloudinary = async (localFilePaths) => {
  // Upload an image
  console.log("localFilePaths", localFilePaths);
  let uploadedFiles = [];
  try {
    for (let localFilePath of localFilePaths) {
      const result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      fs.unlinkSync(localFilePath);
      uploadedFiles.push(result);
    }
  } catch (error) {
    console.log(error);

    for (let localFilePath in uploadedFiles) {
      fs.unlinkSync(localFilePath);
    }
  }
  return uploadedFiles;
};

module.exports = { uploadSingleOnCloudinary, uploadMultipleOnCloudinary };

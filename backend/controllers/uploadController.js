const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    // console.log("image upload")
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    const images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeFile(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path
      },
      (err, res) => {
        if (err) {
          removeFile(file.tempFilePath);
          return res.status(404).json({
            message: "File upload failed",
          });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

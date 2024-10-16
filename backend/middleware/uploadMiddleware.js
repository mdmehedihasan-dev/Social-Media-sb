// const fs = require("fs"); 

// module.exports = async (req, res, next) => {
//   try {
//     if (!req.files || Object.values(req.files).flat().length === 0) {
//       return res.status(404).json({
//         message: "No file Selected",
//       });
//     }
//     const file = Object.values(req.files).flat();
//     file.forEach((files) => {
//       if (
//         files.mimetype !== "image/jpeg" &&
//         files.mimetype !== "image/png" &&
//         files.mimetype !== "image/webp" &&
//         files.mimetype !== "image/gif"
//       ) {
//         removeFile(files.tempFilePath);
//             return res.status(404).json({
//               message: "Unsupported file type",
//             });
//       }
//       if (files.size > 1024 * 1024 * 5) {
//         removeFile(files.tempFilePath);
//         return res.status(404).json({
//           message: "file size is too large",
//         });
//       }
//     });
//     next();
//   } catch (error) {
//     return res.status(404).json({
//       message: error.message,
//     });
//   }
// };

// const removeFile = (path) => {
//   fs.unlink(path, (err) => {
//     if (err) throw err;
//   });
// };


const fs = require("fs");

module.exports = async (req, res, next) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({
        message: "No file selected",
      });
    }

    const files = Object.values(req.files).flat();
    
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/gif"
      ) {
        await removeFile(file.tempFilePath);
        return res.status(400).json({
          message: "Unsupported file type",
        });
      }

      if (file.size > 1024 * 1024 * 5) {
        await removeFile(file.tempFilePath);
        return res.status(400).json({
          message: "File size is too large",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const removeFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

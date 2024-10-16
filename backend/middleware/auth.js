const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let temporary = req.header("Authorization");
    let token = temporary ? temporary.slice(7, temporary.length) : "";

    if (!token) {
      return res.status(404).json({
        message: "User have not valid access token",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "Invalid Authorization",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

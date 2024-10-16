const Users = require("../models/userModel");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { jwToken } = require("../helpers/token");
const { sendVerifiedEmail, sendResetCode } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const Code = require("../models/Code");
const { generateCode } = require("../helpers/generatCode");
const { response } = require("express");

//controller for create new user
exports.newUser = async (req, res) => {
  try {
    const {
      fName,
      lName,
      username,
      email,
      password,
      bMonth,
      bDay,
      bYear,
      verified,
      gender,
    } = req.body;
    // validation for first name
    if (!validateLength(fName, 3, 15)) {
      return res.status(400).json({
        message:
          "First name should be minimun length 3 and maximum length 15 characters",
      });
    }
    // validation for last name
    if (!validateLength(lName, 3, 15)) {
      return res.status(400).json({
        message:
          "Last name should be minimun length 3 and maximum length 15 characters",
      });
    }

    //  validation for email
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const checkMail = await Users.findOne({ email });

    if (checkMail) {
      return res.status(400).json({
        message: "Email is already exixts",
      });
    }

    // validation for password
    if (!validateLength(password, 3, 15)) {
      return res.status(400).json({
        message:
          "Password should be minimun length 6 and maximum length 20 characters",
      });
    }

    // bcrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // validation username
    const tempUsername = fName + lName;
    const userName = await validateUsername(tempUsername);

    const user = await new Users({
      fName,
      lName,
      username: userName,
      email,
      password: hashedPassword,
      bMonth,
      bDay,
      bYear,
      verified,
      gender,
    }).save();

    const userToken = jwToken({ id: user._id.toString() }, "30m");

    const url = `${process.env.BASE_URL}/activate/${userToken}`;
    sendVerifiedEmail(user.email, user.fName, url);

    const token = jwToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      fName: user.fName,
      lName: user.lName,
      cover:user.cover,
      friends:user.friends,
      followers:user.followers,
      token: token,
      verified: user.verified,
      message: "Registration success: Please activate your email address",
    });
  } catch (error) {
    res.status(404).json({
      message: "Can't create User",
    });
  }
};

//controller for verified User
exports.verifiedUser = async (req, res) => {
  try {
    const verified = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const check = await Users.findById(user.id);

    if (verified !== user.id) {
      return res.status(400).json({
        message: "You are not autthorization to complete this operation.",
      });
    }

    if (check.verified === true) {
      return res.status(400).json({
        message: "User already verified",
      });
    } else {
      await Users.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Account has been acctivated successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Can't not verify user",
    });
  }
};

// controller for login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email not found please try again with correct email address",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid credentials, please try again",
      });
    }

    const token = jwToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      fName: user.fName,
      lName: user.lName,
      cover:user.cover,
      friends:user.friends,
      followers:user.followers,
      token: token,
      verified: user.verified,
      message: "Login Successfully 🙋‍♂️",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.reVerification = async (req, res) => {
  try {
    let id = req.user.id;
    const user = await Users.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already verified",
      });
    }
    const userToken = jwToken({ id: user._id.toString() }, "30m");

    const url = `${process.env.BASE_URL}/activate/${userToken}`;
    sendVerifiedEmail(user.email, user.fName, url);
    return res.status(400).json({
      message: "Email verification link has been sent your account",
    });
  } catch (error) {
    res.status(404).json({
      message: "Can't not verify user",
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const matchEmail = await Users.findOne({ email }).select("-password");
    if (!matchEmail) {
      return res.status(404).json({
        message: "Email doesn't exist'",
      });
    }
    res.status(200).json({
      email: matchEmail.email,
      profilePicture: matchEmail.profilePicture,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.resetCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email }).select("-password");
    await Code.findOneAndDelete({ user: user._id });
    const code = generateCode(5);
    const saveCode = await new Code({
      user: user._id,
      code,
    }).save();

    sendResetCode(user.email, user.fName, code);
    return res.status(200).json({
      message: "Reset code has been sent your email",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await Users.findOne({ email });
    const decode = await Code.findOne({ user: user._id });

    if (decode.code !== code) {
      return res.status(404).json({
        message: "Code doesn't match",
      });
    }
    return res.status(200).json({
      message: "thank you",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.changePassword = async (req,res)=>{
  try {
    const {email,password} = req.body
    const cryptedPassword = await bcrypt.hash(password,10)
    await Users.findOneAndUpdate({email}, {password:cryptedPassword})
    return res.status(200).json({
      message:"Password Changed successfully✌️"
    })
  } catch (error) {
    res.status(404).json({
      message:error.message
    })
  }
}
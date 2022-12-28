const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      email,
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and a password", 400)
    );
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid  credentials", 404));
    }

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.massage,
    });
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1>You have requested for a password reset</h1>
    <p>Please click on this link to reset your password</p>
    <a href= ${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ success: true, Data: "Email sent" });
    } catch (error) {
      user.resetpasswordToken = undefined;
      user.resetpasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};
exports.resetpassword = async (req, res, next) => {
  const resetpasswordToken = crypto
    .createHash(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetpasswordToken,
      resetpasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 404));
    }

    user.password = req.body.password;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  res.status(statusCode).json({
    success: true,
    token,
  });
};

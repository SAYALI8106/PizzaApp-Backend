const { loginUser } = require("../services/authService");
const StatusCodes = require("http-status-codes");


async function login(req, res) {
  console.log("Controller: login called");
  try {
    const loginPayload = req.body;

    const response = await loginUser(loginPayload);

    res.cookie("authToken", response, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 * 24 * 7, // 7 days
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "logged in successfully",
      data:{},
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  login
};

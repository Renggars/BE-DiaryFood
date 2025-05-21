const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const ApiError = require("../utils/ApiError");

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);
  res.status(httpStatus.CREATED).send({ message: "Register success", data: { userCreated, tokens } });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ message: "Login success", data: { user, tokens } });
});

const googleCallback = catchAsync(async (req, res) => {
  const tokens = await tokenService.generateAuthTokens(req.user);
  console.log("Redirecting to:", `${process.env.CLIENT_URL}/auth/callback?tokens=...`);

  res.redirect(`${process.env.CLIENT_URL}/auth/callback?tokens=${JSON.stringify(tokens)}`);
});

// const facebookCallback = catchAsync(async (req, res) => {
//   const tokens = await tokenService.generateAuthTokens(req.user);
//   res.redirect(`${process.env.CLIENT_URL}/auth/callback?tokens=${JSON.stringify(tokens)}`);
// });

module.exports = {
  register,
  login,
  googleCallback,
  // facebookCallback,
};

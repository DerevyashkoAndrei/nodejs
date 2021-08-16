const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { createTokens } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const { isAuthData, isRefreshData } = require("../middleware/validators/authValidator");
const AuthService = require("../services/AuthService");

const authRoute = Router();

authRoute.post("/signup", isAuthData, validate, (req, res) => {
  const { login, password } = req.body;
  const user = AuthService.signup(login, password);
  if (!user)
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: [
        {
          msg: "Login is used",
        },
      ],
    });
  res.sendStatus(StatusCodes.OK);
});

authRoute.post(
  "/signin",
  isAuthData,
  validate,
  (req, res, next) => {
    const { login, password } = req.body;
    const user = AuthService.signin(login, password);
    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "login or password not correct",
          },
        ],
      });
    res.locals.uid = user.id;
    res.locals.role = user.role;
    next();
  },
  createTokens
);

authRoute.post(
  "/refresh",
  isRefreshData,
  validate,
  (req, res, next) => {
    const { refresh } = req.body;
    
    const user = AuthService.signin(login, password);
    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "login or password not correct",
          },
        ],
      });
    res.locals.uid = user.id;
    res.locals.role = user.role;
    next();
  },
  createTokens
);

module.exports = authRoute;

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const AuthService = require("../services/AuthService");

console.log("\x1b[36m%s\x1b[0m", "imortal access token : ");
console.log(
  "\x1b[34m%s\x1b[0m",
  jwt.sign({ type: "access", uid: 1, role: "admin" }, JWT_SECRET, {
    expiresIn: "100y",
  })
);

console.log("\x1b[36m%s\x1b[0m", "imortal refresh token : ");
console.log(
  "\x1b[34m%s\x1b[0m",
  jwt.sign({ type: "refresh", uid: 1, role: "admin" }, JWT_SECRET, {
    expiresIn: "100y",
  })
);

exports.private = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.slice(7), JWT_SECRET);
    res.locals.user = AuthService.getById(decoded.uid);
    if (decoded.type !== "access")
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    next();
  } catch {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

exports.admin = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.slice(7), JWT_SECRET);
    res.locals.user = AuthService.getById(decoded.uid);
    if (decoded.type !== "access")
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    if (decoded.role !== "admin") return res.sendStatus(StatusCodes.FORBIDDEN);
    next();
  } catch {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

exports.user = (req, res, next) => {
  res.locals.user = {
    role: req.headers.authorization || null,
    name: "username",
  };
  next();
};

exports.createTokens = (_, res) => {
  const { uid, role } = res.locals;
  res.send({
    access: jwt.sign({ type: "access", uid, role }, JWT_SECRET, {
      expiresIn: "5m",
    }),
    refresh: jwt.sign({ type: "refresh", uid, role }, JWT_SECRET, {
      expiresIn: "1h",
    }),
  });
};



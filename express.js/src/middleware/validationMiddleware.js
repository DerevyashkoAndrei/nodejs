const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    res.end();
    return;
  }
  next();
};

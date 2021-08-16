const { Router } = require("express");
const RequestService = require("../services/RequestService");
const { private, admin } = require("../middleware/authMiddleware");

const requestRoute = Router();

requestRoute.get("/", private, admin, (req, res) => {
  const list = RequestService.getList();
  res.send(list);
});

module.exports = requestRoute;

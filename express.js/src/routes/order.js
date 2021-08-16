const { Router } = require("express");
const { private, admin } = require("../middleware/authMiddleware");
const { logRequest } = require("../middleware/loggerMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const { validateParamId } = require("../middleware/validators/commonValidator");
const { StatusCodes } = require("http-status-codes");
const { toInt } = require("../middleware/sanitizers/commonSanitizer");
const OrderService = require("../services/OrderService");
const {
  isOrderExist,
  isOrderData,
} = require("../middleware/validators/orderValidator");

const orderRoute = Router();

orderRoute.use(logRequest);

orderRoute.get("/", admin, (req, res) => {
  const list = OrderService.getList();
  res.send(list);
});

orderRoute.post("/", isOrderData, validate, private, (req, res) => {
  const data = Object.assign({}, req.body, { userId: res.locals.user.id });
  const order = OrderService.create(data);
  res.send(order);
});

orderRoute.use(
  "/:id",
  validateParamId.custom(isOrderExist).bail(),
  validate,
  (_, __, next) => next("route")
);

orderRoute.get("/:id", private, (req, res) => {
  const id = toInt(req.params.id);
  const order = OrderService.getById(id);
  const { user } = res.locals;
  if (user && (user.role === "admin" || user.id !== order.userId))
    res.send(order);
  else res.sendStatus(StatusCodes.FORBIDDEN);
});

orderRoute.delete("/:id", admin, (req, res) => {
  const id = toInt(req.params.id);
  OrderService.delete(id);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

orderRoute.put("/:id", isOrderData, validate, admin, (req, res) => {
  const id = toInt(req.params.id);
  OrderService.update(id, req.body);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = orderRoute;

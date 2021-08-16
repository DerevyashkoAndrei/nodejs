const { Router } = require("express");
const { admin } = require("../middleware/authMiddleware");
const { logRequest } = require("../middleware/loggerMiddleware");
const PizzaService = require("../services/PizzaService");
const { validate } = require("../middleware/validationMiddleware");
const { validateParamId } = require("../middleware/validators/commonValidator");
const {
  isPizzaExist,
  isPizza,
} = require("../middleware/validators/pizzaValidator");
const { StatusCodes } = require("http-status-codes");
const { toInt } = require("../middleware/sanitizers/commonSanitizer");

const pizzaRoute = Router();

pizzaRoute.use(logRequest);

pizzaRoute.get("/", (req, res) => {
  const list = PizzaService.getList();
  res.send(list);
});

pizzaRoute.post("/", isPizza, validate, admin, (req, res) => {
  const pizza = PizzaService.create(req.body);
  res.send(pizza);
});

pizzaRoute.use(
  "/:id",
  validateParamId.custom(isPizzaExist).bail(),
  validate,
  (_, __, next) => next("route")
);

pizzaRoute.get("/:id", (req, res) => {
  const id = toInt(req.params.id);
  const pizza = PizzaService.getById(id);
  res.send(pizza);
});

pizzaRoute.delete("/:id", admin, (req, res) => {
  const id = toInt(req.params.id);
  PizzaService.delete(id);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

pizzaRoute.put("/:id", isPizza, validate, admin, (req, res) => {
  const id = toInt(req.params.id);
  PizzaService.update(id, req.body);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = pizzaRoute;

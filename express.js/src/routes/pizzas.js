const { Router } = require("express");
const { admin } = require("../middleware/authMiddleware");
const { logRequest } = require("../middleware/loggerMiddleware");
const PizzaService = require("../services/PizzaService");
const { pizzasUploads } = require("../services/UploadService");
const { validate } = require("../middleware/validationMiddleware");
const { validateParamId } = require("../middleware/validators/commonValidator");
const {
  isPizzaExist,
  isPizza,
} = require("../middleware/validators/pizzaValidator");
const { StatusCodes } = require("http-status-codes");
const { toInt } = require("../middleware/sanitizers/commonSanitizer");
const { UPLOADS_FOLDER, PIZZA_IMAGES } = require("../config");

const pizzaRoute = Router();

pizzaRoute.use(logRequest);

pizzaRoute.get("/", (req, res) => {
  const list = PizzaService.getList();
  res.send(list);
});

pizzaRoute.post(
  "/",
  pizzasUploads.fields([{ name: "main", maxCount: 1 }]),
  isPizza,
  validate,
  admin,
  (_, __, next) => {
    console.log(_.body, _.files, _.headers["content-type"]);
    next();
  },
  (req, res) => {
    if (req.files && req.files.main && !req.files.main[0])
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    const pizza = PizzaService.create(
      Object.assign({}, req.body, {
        photo: `${UPLOADS_FOLDER + PIZZA_IMAGES}${req.files.main[0].filename}`,
      })
    );
    res.send(pizza);
  }
);

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

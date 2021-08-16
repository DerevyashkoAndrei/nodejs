const PizzaService = require("../services/PizzaService");
const { StatusCodes } = require("http-status-codes");
const pizzaRouter = require("@koa/router")({
  prefix: "/pizzas",
});

const getList = async (ctx) => {
  ctx.body = await PizzaService.getList();
};

const getById = async (ctx) => {
  const pizza = await PizzaService.getById(parseInt(ctx.params.id));
  if (pizza) {
    ctx.body = pizza;
  } else {
    ctx.status = StatusCodes.NOT_FOUND;
  }
};

const create = async (ctx) => {
  const pizza = await PizzaService.create(
    Object.assign({}, ctx.request.body, { photo: null })
  );
  if (pizza) {
    ctx.body = pizza;
  } else {
    ctx.status = StatusCodes.BAD_REQUEST;
  }
};
const update = async (ctx) => {
  const pizza = await PizzaService.update(
    parseInt(ctx.params.id),
    Object.assign({}, ctx.request.body, { photo: null })
  );
  if (pizza) {
    ctx.body = pizza;
  } else {
    ctx.status = StatusCodes.BAD_REQUEST;
  }
};
const remove = async (ctx) => {
  await PizzaService.delete(parseInt(ctx.params.id));
};

pizzaRouter
  .post("/", create)
  .get("/", getList)
  .get("/:id", getById)
  .put("/:id", update)
  .delete("/:id", remove);

module.exports = pizzaRouter;

const { checkSchema } = require("express-validator");
const PizzaService = require("../../services/PizzaService");

exports.isPizzaExist = (id) => {
  const pizza = PizzaService.getById(id);
  if (!pizza) {
    throw Error("pizza not exist");
  }
  return true;
};

exports.isPizza = checkSchema({
  name: {
    in: ["body"],
    errorMessage: "name is wrong",
    isString: true,
    isLength: { min: 1, max: 128 },
  },
});

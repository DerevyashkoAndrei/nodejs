const { checkSchema } = require("express-validator");
const OrderService = require("../../services/OrderService");
const { toInt } = require("../sanitizers/commonSanitizer");

exports.isOrderExist = (id) => {
  const order = OrderService.getById(id);
  if (!order) {
    throw Error("Order not exist");
  }
  return true;
};

exports.isOrderData = checkSchema({
  pizzas: {
    in: ["body"],
    errorMessage: "pizzas must be array number",
    custom: {
      options: (value) => {
        try {
          return value.every((option) => option === toInt(option));
        } catch {
          return false;
        }
      },
    },
  },
});

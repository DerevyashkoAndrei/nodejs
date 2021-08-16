const CrudService = require("./CrudService");

class PizzaService extends CrudService {
  ID = 3;

  list = [
    Object.freeze({ id: 1, name: "Prekol" }),
    Object.freeze({ id: 2, name: "ne precol" }),
  ];
}

module.exports = new PizzaService();

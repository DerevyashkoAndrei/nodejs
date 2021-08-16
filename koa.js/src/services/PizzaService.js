const CrudService = require("./CrudService");

class PizzaService extends CrudService {
  ID = 3;

  list = [
    Object.freeze({ id: 1, name: "Prekol", photo: null }),
    Object.freeze({ id: 2, name: "ne precol", photo: null }),
  ];
}

module.exports = new PizzaService();

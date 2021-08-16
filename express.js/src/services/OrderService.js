const CrudService = require("./CrudService");
const PizzaService = require("./PizzaService");

class OrderService extends CrudService {
  ID = 2;

  statuses = ["active", "closed", "canceled"];

  list = [
    {
      id: 1,
      userId: 1,
      pizzas: [1],
      createTimestamp: Date.now(),
      status: "active",
    },
  ];

  /**
   * join pizzas to order
   * @param {number[]} pizzas list of pizza ids
   * @private
   */
  _joinPizzas = (pizzas) => {
    return pizzas
      .map((pizzaId) => PizzaService.getById(pizzaId))
      .filter((item) => !!item);
  };

  /**
   * get orders list
   * @public
   * @returns {object | null}
   */
  getList() {
    return this.list.map((item) => {
      item = Object.assign(item);
      item.pizzas = this._joinPizzas(item.pizzas);
      return item;
    });
  }

  /**
   * get order by id
   * @public
   * @param {number} id
   * @returns {object[]}
   */
  getById(id) {
    return this.list.find((item) => item.id === id);
  }

  /**
   * create new order
   * @public
   * @param {number} id
   * @returns {object[]}
   */
  create(data) {
    const newItem = Object.freeze({
      ...data,
      id: this.ID++,
      createTimestamp: Date.now(),
      status: "active",
    });
    this.list.push(newItem);
    return newItem;
  }

  /**
   * update new order
   * @public
   * @param {number} id
   * @param {object} data
   * @returns {object[]}
   */
  update(id, data) {
    if (data.status && !this.statuses.includes(data.status)) return null;
    const newItem = Object.freeze({ ...data, id });
    this.list = this.list.map((item) =>
      item.id === id ? { ...item, ...newItem } : item
    );
    return newItem;
  }
}

module.exports = new OrderService();

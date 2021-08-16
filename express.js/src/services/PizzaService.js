class PizzaService {
  ID = 3;

  list = [
    Object.freeze({ id: 1, name: "Prekol" }),
    Object.freeze({ id: 2, name: "ne precol" }),
  ];

  
  getList() {
    return this.list;
  }

  getById(id) {
    return this.list.find((pizza) => pizza.id === id);
  }
  
  create(data) {
    const newItem = Object.freeze({...data, id: this.ID++});
    this.list.push(newItem);
    return newItem;
  }
  
  update(id, data) {
    const newItem = Object.freeze({...data,id});
    this.list = this.list.map(item => item.id === id ? newItem : item);
    return newItem;
  }

  delete(id) {
    return this.list = this.list.filter(item => item.id !== id);
  }
}

module.exports = new PizzaService();

class CrudService {
  ID = 1;

  list = [];

  /**
   * get list
   * @public
   * @returns {object[]}
   */
  getList() {
    return this.list;
  }

  /**
   * get by id
   * @public
   * @param {number} id
   * @returns {object[]}
   */
  getById(id) {
    return this.list.find((item) => item.id === id);
  }

  /**
   * create
   * @public
   * @param {object} data
   * @returns {object} new item
   */
  create(data) {
    const newItem = Object.freeze({ ...data, id: this.ID++ });
    this.list.push(newItem);
    return newItem;
  }
  /**
   * update by id
   * @public
   * @param {number} id
   * @param {object} data
   * @returns {object} updated item
   */
  update(id, data) {
    const newItem = Object.freeze({ ...data, id });
    this.list = this.list.map((item) =>
      item.id === id ? { ...item, ...newItem } : item
    );
    return newItem;
  }

  /**
   * delete by id
   * @public
   * @param {number} id
   * @returns {object[]} new list item
   */
  delete(id) {
    return (this.list = this.list.filter((item) => item.id !== id));
  }
}

module.exports = CrudService;

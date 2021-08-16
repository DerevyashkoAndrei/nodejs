class RequestService {
  ID = 1;

  list = [];

  /**
   * add log
   * @param {object} item
   * @returns {object} new record
   */
  add(item) {
    const data = Object.freeze({ ...item, id: this.ID++ });
    return this.list.push(data);
  }

  /**
   * get list request
   * @returns {object[]} requests list
   */
  getList() {
    return this.list;
  }
}

module.exports = new RequestService();

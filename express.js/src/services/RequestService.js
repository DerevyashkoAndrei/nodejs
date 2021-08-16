class RequestService {
  ID = 1;

  list = [];

  add(item) {
    const data = Object.freeze({ ...item, id: this.ID++ });
    return this.list.push(data);
  }

  getList() {
    return this.list;
  }
}

module.exports = new RequestService();

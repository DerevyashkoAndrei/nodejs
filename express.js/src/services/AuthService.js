class AuthService {
  ID = 2;

  access_exp = 1000 * 60 * 5;
  refresh_exp = 1000 * 60 * 60;

  roles = ["user", "admin"];

  list = [{ id: 1, login: "username", password: "password", role: "admin" }];
  /**
   * check login in list
   * @param {object} login
   * @returns {boolean} result of check
   */
  _isLoginExist = (login) => this.list.some((item) => item.login === login);
  /**
   * get user by login
   * @param {object} login
   * @returns {object | null} user
   */
  _getByLogin = (login) => this.list.find((item) => item.login === login);
  /**
   * get copy user without password
   * @param {object} user
   * @returns {object} user
   */
  _cloneUserWithoutPassword = (user) => {
    const copyUser = { ...user };
    delete copyUser.password;
    Object.freeze(copyUser);
    return copyUser;
  };

  /**
   * get user by id
   * @param {number} id
   * @returns {object | null} user
   */
  getById(id) {
    const user = this.list.find((item) => item.id === id);
    return user && this._cloneUserWithoutPassword(user);
  }

  /**
   * update user role
   * @param {number} id
   * @returns {object | null} user
   */
  updateRole(id, role) {
    if (!this.roles.includes(role)) return null;
    this.list = this.list.map((item) =>
      item.id === id ? { ...item, role } : item
    );
    return this.getById(id);
  }

  /**
   * signup
   * @param {string} login
   * @param {string} password
   * @returns user
   */
  signup(login, password) {
    if (this._isLoginExist(login)) return null;
    const newItem = { id: this.ID++, login, password, role: "user" };
    this.list.push(newItem);
    return this._cloneUserWithoutPassword(newItem);
  }

  /**
   * signin
   * @param {string} login
   * @param {string} password
   * @returns user
   */
  signin(login, password) {
    const user = this._getByLogin(login);
    if (!user || user.password !== password) return null;
    return this._cloneUserWithoutPassword(user);
  }
}

module.exports = new AuthService();

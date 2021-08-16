class AuthService {
    ID = 2

    access_exp = 1000 * 60 * 5; 
    refresh_exp = 1000 * 60 * 60; 

    roles = ['user', 'admin'];

    list = [
        {id: 1, login: 'username', password: 'password', role: 'admin'}
    ]

    _isLoginExist = (login) => this.list.some(item => item.login === login)
    _getByLogin = (login) => this.list.find(item => item.login === login)
    _cloneUserWithoutPassword = (user) => {
        const copyUser = {...user}
        delete copyUser.password;
        Object.freeze(copyUser);
        return copyUser;
    }


    getById(id) {
        const user = this.list.find(item => item.id === id);
        return this._cloneUserWithoutPassword(user);
    }

    updateRole(id, role) {
        if (!this.roles.includes(role)) return null;
        this.list = this.list.map(item => item.id === id ? {...item, role} : item);
        return this.getById(id);
    }

    signup(login, password) {
        if (this._isLoginExist(login)) return null;
        const newItem = { id: this.ID++, login, password, role: 'user' };
        this.list.push(newItem);
        return this._cloneUserWithoutPassword(newItem);
    }

    signin(login, password) {
        const user = this._getByLogin(login);
        if (!user || user.password !== password) return null;
        return this._cloneUserWithoutPassword(user);
    }
}

module.exports = new AuthService();
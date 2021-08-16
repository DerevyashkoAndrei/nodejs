const { checkSchema } = require('express-validator');

exports.isAuthData = checkSchema({
    login: {
        in: ['body'],
        errorMessage: "login is required string",
        isString: true,
        isLength: {min: 1, max: 128}
    },
    password: {
        in: ['body'],
        errorMessage: "password is required string",
        isString: true,
        isLength: {min: 1, max: 128}
    },
})

exports.isRefreshData = checkSchema({
    refresh: {
        in: ['body'],
        errorMessage: "token is required string",
        isString: true,
        isLength: {min: 1}
    },
})
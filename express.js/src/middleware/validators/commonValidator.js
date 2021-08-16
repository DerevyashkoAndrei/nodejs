const { param } = require('express-validator');
const { toInt } = require('../sanitizers/commonSanitizer');

exports.validateParamId =  param('id')
    .customSanitizer(toInt)
    .isInt({min: 0, max: 112})
    .withMessage('id must be int')
    .bail()

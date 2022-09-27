const { check, validationResult } = require('express-validator');
const Agency = require('../model/agency');
const Client = require('../model/client');
exports.validateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('ame can not be empty!')
        .bail(),
    check('address1')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Address1 can not be empty!')
        .bail(),
    check('state')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('State can not be empty!')
        .bail(),
    check('city')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('City can not be empty!')
        .bail(),
    check('phone')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Client Phone can not be empty!')
        .bail(),
    check('totalBill')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Total Bill can not be empty!')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail()
        .custom(value => {
            return Client.findOne({ email: value })
                .then((data) => {
                    console.log(data)
                    if (data) {
                        return Promise.reject('Email already taken')
                    }
                })
        }),
];
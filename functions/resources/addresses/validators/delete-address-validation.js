const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    userId: [
        [shouldBeUuid, 'Bad Value of userId'],
    ],
    addressId :  [
        [shouldBeUuid, 'Bad Value of addressId'],
    ]
}

module.exports.validate = async data => validate(rule, data)
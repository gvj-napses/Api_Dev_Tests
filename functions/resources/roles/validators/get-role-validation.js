const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    roleId: [
        [shouldBeUuid, 'Bad Value of roleId'],
    ]
}

module.exports.validate = async data => validate(rule, data)
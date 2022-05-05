const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    roleId: [
        [shouldBeUuid, 'Bad Value of roleId'],
    ],
    userId : [
        [shouldBeUuid, 'Bad Value of userId']
    ]
}

module.exports.validate = async data => validate(rule, data)
const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    userId: [
        [shouldBeUuid, 'Bad Value of userId'],
    ]
}

module.exports.validate = async data => validate(rule, data)
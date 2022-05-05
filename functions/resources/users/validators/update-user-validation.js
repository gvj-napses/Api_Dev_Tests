const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    userId: [
        [shouldBeUuid, 'Bad Value of userId'],
    ],
    name: [
        [notEmpty, 'Name is mandatory!'],
    ],
    email: [
        [notEmpty, 'Email is mandatory!'],
        [isEmail, 'Invalid email!']
    ],
    mobile: [
        [isMobileNumber, 'User mobile number should be a valid mobile number!']
    ]
}

module.exports.validate = async data => validate(rule, data)
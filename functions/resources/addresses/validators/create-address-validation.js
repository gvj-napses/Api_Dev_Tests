const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    name: [
        [notEmpty, 'Name is mandatory!'],
    ],
    street: [
        [notEmpty, 'Street is mandatory!'],
    ],
    city: [
        [notEmpty, 'City is mandatory!'],
    ],
    country: [
        [notEmpty, 'Country is mandatory!'],
    ],
    userId : [
        [shouldBeUuid,'UserId should be UUID']
    ]
    
}

module.exports.validate = async data => validate(rule, data)
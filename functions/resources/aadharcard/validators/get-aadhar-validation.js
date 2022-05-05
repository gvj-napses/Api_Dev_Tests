const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
   userId : [
    [shouldBeUuid, 'userId Should be UUID!'],
]
}

module.exports.validate = async data => validate(rule, data)
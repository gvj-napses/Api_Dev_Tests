const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    name: [
        [notEmpty, 'Name is mandatory!'],
    ],
    aadharnumber: [
        [notEmpty , "Aadhar number is mandatory"]
    ],
   aadharId : [
    [notEmpty, 'aadharId is mandatory!'],
        [shouldBeUuid, 'aadharId Should be UUID!'],
   ],
   userId : [
    [shouldBeUuid, 'userId Should be UUID!'],
]
}

module.exports.validate = async data => validate(rule, data)
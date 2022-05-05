const { validate, notEmpty, shouldBeUuid, isEmail, isMobileNumber } = require('validation')

const rule = {
    name: [
        [notEmpty, 'Name is mandatory!'],
    ],
    email: [
        [notEmpty, 'Email is mandatory!'],
        [isEmail, 'Invalid email!']
    ],
    confirmemail : [
        [(value,object)=>{
            return value === object.email
        }, 'Confirmed email does not match user email'] // Customized validation
    ],
    mobile: [
        [isMobileNumber, 'User mobile number should be a valid mobile number!']
    ]
}

module.exports.validate = async data => validate(rule, data)
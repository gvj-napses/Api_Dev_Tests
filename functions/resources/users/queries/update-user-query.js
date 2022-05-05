const Models = require('models')

module.exports = class createUserQuery {
    constructor(userId, name, email, mobile) {
        this.details = {
            userId,
            name,
            email,
            mobile
        }
    }

    get() {
        return Models.users.update({
            name: this.details.name,
            email: this.details.email,
            mobile: this.details.mobile
        },{where : {id : this.details.userId}})
    }
}
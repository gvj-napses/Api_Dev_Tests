const { user } = require('firebase-functions/v1/auth')
const Models = require('models')

module.exports = class getaUserQuery {
    constructor(userId) {
        this.details = {
            userId : userId
        }
    }

    get() {
        return Models.users.findOne({ where : {id : this.details.userId},attributes : {exclude : ['createdAt']}})
    }
}
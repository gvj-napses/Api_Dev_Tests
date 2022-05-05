const Models = require('models')

module.exports = class getAadharQuery {
    constructor(userId) {
        this.details = {
            userId : userId
        }
    }

    async get() {
        const user = await Models.users.findOne({where : {id : this.details.userId}})
        return user.getAddresses()
    }
}
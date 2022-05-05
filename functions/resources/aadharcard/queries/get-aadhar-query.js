const { user } = require('firebase-functions/v1/auth')
const Models = require('models')

module.exports = class getAadharQuery {
    constructor(userId) {
        this.details = {
            userId : userId
        }
    }

    async get() {
        const user = await Models.users.findOne({where : {id : this.details.userId}})
        return Models.aadharcarddetails.findOne({ where : {id : user.aadharId}, include : [{model : Models.users,'attributes' : ['name','email']}],attributes : {exclude : ['createdAt']}})
    }
}
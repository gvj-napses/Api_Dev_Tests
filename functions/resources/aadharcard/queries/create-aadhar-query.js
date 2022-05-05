const Models = require('models')

module.exports = class createAadharQuery {
    constructor(userId, aadharId,name, aadharnumber) {
        this.details = {
            userId,
            aadharId,
            name,
            aadharnumber
        }
    }

    async get() {

        const aadharCard = await Models.aadharcarddetails.create({
            id : this.details.aadharId,
            name : this.details.name,
            aadharnumber : this.details.aadharnumber

        })
        const user = await Models.users.findOne({where : {id : this.details.userId}})
        await aadharCard.setUser(user) // Model name : 'users'
        return aadharCard;
    }
}
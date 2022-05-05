const Models = require('models')

module.exports = class createAddressQuery {
    constructor(addressId,name,street,city,country,userId) {
        this.details = {
            addressId,
            name,
            street,
            city,
            country,
            userId
        }
    }

    async get() {


        const address = await Models.addresses.create({
            id : this.details.addressId,
            name : this.details.name,
            street : this.details.street,
            city : this.details.city,
            country : this.details.country,
            userId : this.details.userId

        })
        const user = await Models.users.findOne({where : {id : this.details.userId}})
        await address.setUser(user) // Model name : 'users'
        return address;
    }
}
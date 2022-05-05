const Models = require('models')
const { type } = require('ramda')

module.exports = class deleteAddressQuery {
    constructor(userId,addressId) {
        this.details = {
            userId : userId,
            addressId : addressId
        }
    }

    async get() {
        const user = await Models.users.findOne({where : {id : this.details.userId}})
        const address = await Models.addresses.findOne({where : {id : this.details.addressId}})
        //return await user.removeAddress(address) // response not in json format
        const deletedAddress = await user.removeAddress(address) // response not in json format
        //console.log(deletedAddress)
        const address_change = await Models.addresses.findOne({where : {id : this.details.addressId}})
        return address_change
    }
}
const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const getAddressesQuery = require('resources/addresses/queries/delete-address-query.js')
const deleteAddressValidation = require('../validators/delete-address-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function delete_address(req) {

    const {userId,addressId} = req.params;

    logInfo('Request to delete a single address of user', {
        userId,addressId
    })

    let response = await composeResult(() => {
        return db.execute(new getAddressesQuery(userId,addressId))
    },deleteAddressValidation.validate)({userId,addressId})
    

    return respond(response, 'Successfully deleted address', 'Error in deleting address')
}

Route.withOutSecurity().noAuth().delete('/users/:userId/addresses/:addressId', delete_address).bind()
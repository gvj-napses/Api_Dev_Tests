const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const createAddressQuery = require('resources/addresses/queries/create-address-query.js')
const createAddressValidation = require('../validators/create-address-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function post(req) {
    const { name, street,city,country } = req.body

    const addressId = uuid.v4();

    const {userId} = req.params

    logInfo('Request to create Address for user', {
        userId, name, street, city
    })

    let response = await composeResult(() => {

    return db.execute(new createAddressQuery(addressId,name,street,city,country,userId))

    }, createAddressValidation.validate)({addressId,name,street,city,country,userId})
    

    return respond(response, 'Successfully created address for user', 'Error creating addresses')
}

Route.withOutSecurity().noAuth().post('/users/:userId/addresses', post).bind()
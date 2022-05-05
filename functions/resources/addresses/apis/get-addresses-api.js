const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const getAddressesQuery = require('resources/addresses/queries/get-addresses-query.js')
const getAddressValidation = require('../validators/get-address-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function get(req) {

    const {userId} = req.params;

    logInfo('Request to get all addresses of user', {
        userId
    })



    let response = await composeResult(()=>{
        return db.execute(new getAddressesQuery(userId))
    },getAddressValidation.validate)({userId})

    return respond(response, 'Successfully retreived addresses', 'Error getting addresses from database')
}

Route.withOutSecurity().noAuth().get('/users/:userId/addresses', get).bind()
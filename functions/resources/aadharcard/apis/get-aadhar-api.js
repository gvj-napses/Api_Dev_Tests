const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const getAadharQuery = require('resources/aadharcard/queries/get-aadhar-query.js')
const getAadharValidation = require('../validators/get-aadhar-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')


async function get(req) {
    const { userId } = req.params;

    logInfo('Request to get aadhar details by id', {
        userId
    })

    let response =  await composeResult(() => {
        return  db.execute(new getAadharQuery(userId))
    },getAadharValidation.validate)({userId})

    return respond(response, 'Successfully retreived aadhar details for user', 'Error getting aadhar details for user from database')
}

Route.withOutSecurity().noAuth().get('/users/:userId/aadhar', get).bind()
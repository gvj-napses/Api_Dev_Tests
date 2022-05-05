const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const createAadharQuery = require('resources/aadharcard/queries/create-aadhar-query.js')
const createAadharValidation = require('../validators/create-aadhar-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function post(req) {
    const { name, aadharnumber } = req.body

    const aadharId = uuid.v4();

    const {userId} = req.params

    logInfo('Request to create aadhar', {
        userId, name, aadharnumber
    })

    let response = await composeResult(() => {
        return db.execute(new createAadharQuery(userId,aadharId,name,aadharnumber))
    },createAadharValidation.validate)({userId,aadharId,name,aadharnumber})

    return respond(response, 'Successfully created aadhar', 'Error creating aadhar')
}

Route.withOutSecurity().noAuth().post('/users/:userId/aadhar', post).bind()
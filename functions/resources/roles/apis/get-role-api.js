const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const getRoleQuery = require('resources/roles/queries/get-role-query.js')
const getRoleValidation = require('../validators/get-role-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function get(req) {

    
    const {roleId} = req.params

    logInfo('Request to get Role Details', {
        roleId
    })

    let response = await composeResult( () => {
        return  db.execute(new getRoleQuery(roleId))
    },getRoleValidation.validate)({roleId})

    return respond(response, 'Successfully retreived role details', 'Error getting role details')
}

Route.withOutSecurity().noAuth().get('/roles/:roleId', get).bind()
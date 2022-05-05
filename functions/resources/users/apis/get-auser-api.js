const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const getaUserQuery = require('resources/users/queries/get-aUser-query.js')
const getUserValidation = require('../validators/get-user-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')


async function get(req) {
    const { userId } = req.params;

    logInfo('Request to get user by id', {
        userId
    })

    let response = await composeResult(()=>{
        return db.execute(new getaUserQuery(userId))
    },getUserValidation.validate)({userId})

    //let response = await db.execute(new getaUserQuery(userId))

    return respond(response, 'Successfully retreived user', 'Error getting user from database')
}

Route.withOutSecurity().noAuth().get('/users/:userId', get).bind()
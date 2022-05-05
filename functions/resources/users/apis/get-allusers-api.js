const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const getallUsersQuery = require('resources/users/queries/get-allusers-query.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function get(req) {

    logInfo('Request to get all  users', {
        
    })

    let response = await composeResult(()=>{
        return db.execute(new getallUsersQuery())
    })()

    //let response = await db.execute(new getallUsersQuery())

    return respond(response, 'Successfully retreived users', 'Error getting users from database')
}

Route.withOutSecurity().noAuth().get('/users', get).bind()
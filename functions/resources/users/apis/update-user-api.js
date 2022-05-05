const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const updateUserQuery = require('resources/users/queries/update-user-query.js')
const updateUserValidation = require('../validators/update-user-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function post(req) {
    const { name, email, mobile } = req.body

    const {userId} = req.params;

    logInfo('Request to update user', {
        userId, name, email, mobile
    })

    let response = await composeResult( ()=> {
        return db.execute(new updateUserQuery(userId,name,email,mobile))},
        //withArgs(db.execute,new updateUserQuery(userId,name,email,mobile))
        updateUserValidation.validate
    )({userId,name,email,mobile})

    return respond(response, 'Successfully update user', 'Error updating user')
}

Route.withOutSecurity().noAuth().put('/users/:userId', post).bind()
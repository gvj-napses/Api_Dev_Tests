const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const createRoleQuery = require('resources/roles/queries/assign-role-query.js')
const createRoleValidation = require('../validators/assign-role-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function post(req) {

    const {roleId} = req.body
    const {userId} = req.params

    const id = uuid.v4();
    logInfo('Request to assign Role for user', {
        userId,roleId
    })

    let response = await composeResult(()=>{
        return db.execute(new createRoleQuery(id,userId,roleId)) 
        // instead of this line, use this
        //withArgs(db.execute,new createRoleQuery(id,userId,roleId))
    },createRoleValidation.validate)({id,userId,roleId})


    //let response = await db.execute(new createRoleQuery(id,userId,roleId))

    return respond(response, 'Successfully assigned role for user', 'Error assigning roles')
}

Route.withOutSecurity().noAuth().post('/users/:userId/roles', post).bind()
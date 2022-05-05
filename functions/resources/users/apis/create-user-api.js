const Route = require('route')
const db = require('db/repository')
const Result = require('folktale/result')
const uuid = require('uuid')
const createUserQuery = require('resources/users/queries/create-user-query.js')
const createUserValidation = require('../validators/create-user-validation.js')


const { respond, logInfo, whenResult, composeResult, withArgs } = require('lib')

async function post(req) {
    const { name, email, mobile , confirmemail} = req.body

    const userId = uuid.v4();

    logInfo('Request to create user', {
        userId, name, email, mobile
    })

    //let validationResult = await createUserValidation.validate({name,email,mobile,confirmemail})

    let response = await composeResult(()=>{
        return db.execute(new createUserQuery(userId,name,email,mobile)) 
        // instead of this line, use this
        //withArgs(db.execute,new createUserQuery(userId,name,email,mobile))
    },createUserValidation.validate)({userId,name,email,mobile,confirmemail})

    // composeResult(successFunction,chainedFunction) (args) - Args are passed along to the parent function

    // let response = await whenResult( async ()=>{
    //     return await db.execute(new createUserQuery(userId,name,email,mobile)) // success function
    // })(validationResult) // error function gives back the validation Error

    //let response = await db.execute(new createUserQuery(userId,name,email,mobile))

    return respond(response, 'Successfully created user', 'Error creating user')
}

Route.withOutSecurity().noAuth().post('/users', post).bind()
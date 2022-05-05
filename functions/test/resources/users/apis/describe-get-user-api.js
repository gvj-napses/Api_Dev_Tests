const ApiError = require('lib/functional/api-error');
const ValidationError = require('lib/validation-error');
const chai =require('chai');
const {expect}= chai
const sinon = require('sinon')
const sinonChai=require('sinon-chai');
const TestRoutes = require("helpers/test-route");
chai.use(sinonChai);
const uuid = require('uuid');
const db =require('db/repository');
const {resolveOk, resolveError, validationError, resolveDbResult} = require('helpers/resolvers');
const {verifyArgs}= require('helpers/verifiers');
const getUserQuery = require("resources/users/queries/get-aUser-query");
const getUserValidation = require('resources/users/validators/get-user-validation');


describe('get user api', ()=>{
    let sandbox=sinon.createSandbox();
    let req =  {
        params : {
            userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
        },
        body : {
           
        }
    }
    beforeEach(()=>{
        res={
            setHeader: sandbox.spy(),
            send: sandbox.spy(),
            status: sandbox.spy(()=>{
                return res;
            })
        }
    })

    it('should return user when id is provided correctly', async() => {
       
        sandbox.mock(getUserValidation).expects('validate')
        .withArgs(verifyArgs((data) => {
            expect(data).to.be.instanceof(Object)
            expect(data.userId).to.be.string;
            
        }))
        .returns(resolveOk(true))

        sandbox.mock(db).expects('execute')
        .withArgs(verifyArgs((query)=>{
             expect(query).to.be.instanceOf(getUserQuery);
             expect(query.details.userId).to.be.eql("d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f");
        }))
        .returns(resolveOk({
         name : "Jagannath",
         email : "gvj@jj.com",
         mobile : 9121960239
        }))
 
        const response =  await TestRoutes.execute('/users/:userId','Get',req,res);
 
        expect(response).to.be.eql({
         entity:{ email : "gvj@jj.com",name:"Jagannath",mobile:9121960239},
         status: true,
         message:'Successfully retreived user'
     })
        
     })
 

    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(getUserValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of userId'])))
        sandbox.mock(db).expects('execute').never()
        const response = await TestRoutes.executeWithError('/users/:userId','Get', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of userId']))
    })
    

     it('should handle error if something goes wrong', async () => {

        sandbox.mock(getUserValidation).expects('validate')
        . withArgs(verifyArgs((data) => {
         expect(data).to.be.instanceof(Object)
         expect(data.userId).to.be.string;
         
     }))
        .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId','Get',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error getting user from database"))

    })



    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
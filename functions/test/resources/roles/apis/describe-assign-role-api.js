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
const assignRoleQuery = require("resources/roles/queries/assign-role-query");
const assignRoleValidation = require('resources/roles/validators/assign-role-validation');


describe('assign role for user api', ()=>{
    let sandbox=sinon.createSandbox();
    let id = uuid.v4();
    //sandbox.stub(uuid,'v4').returns(id);
    let req =  {
        params : {
            
            userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
        },
        body : {
            roleId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"
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
    
    it('should assign role when all the data is provided correctly', async() => {
       

       sandbox.mock(assignRoleValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
        expect(data.roleId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(assignRoleQuery);
            expect(query.details.userId).to.be.eql(req.params.userId);
       }))
       .returns(resolveOk({
        userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f",
        roleId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"
       }))


       const response =  await TestRoutes.execute('/users/:userId/roles','Post',req,res);

       expect(response).to.be.eql({
        entity:{ roleId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506",userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"},
        status: true,
        message:'Successfully assigned role for user'
    })
       
    })


    it('respond validate errors when incorrect data is provided - roleId', async ()=>{
        sandbox.mock(assignRoleValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of roleId'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/users/:userId/roles','Post', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of roleId']))
    })
    



    it('should handle error if something goes wrong', async () => {


       sandbox.mock(assignRoleValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
        expect(data.roleId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId/roles','Post', req, res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error assigning roles"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
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
const getRoleQuery = require("resources/roles/queries/get-role-query");
const getRoleValidation = require('resources/roles/validators/get-role-validation');


describe('get role details api', ()=>{
    let sandbox=sinon.createSandbox();
    let id = uuid.v4();
    //sandbox.stub(uuid,'v4').returns(id);
    let req =  {
        params : {
            
            roleId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
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
    
    it('should get role details when all the data is provided correctly', async() => {

       sandbox.mock(getRoleValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.roleId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(getRoleQuery);
            expect(query.details.roleId).to.be.eql(req.params.roleId);
       }))
       .returns(resolveOk({
       name : "CEO",
       users : [
           {
               name : "gvj"
           }
       ]
       }))


       const response =  await TestRoutes.execute('/roles/:roleId','Get',req,res);

       expect(response).to.be.eql({
        entity:{ name : "CEO",users : [{name : "gvj"}]},
        status: true,
        message:'Successfully retreived role details'
    })
       
    })


    it('respond validate errors when incorrect data is provided - roleId', async ()=>{
        sandbox.mock(getRoleValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of roleId'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/roles/:roleId','Get', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of roleId']))
    })
    



    it('should handle error if something goes wrong', async () => {


       sandbox.mock(getRoleValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.roleId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/roles/:roleId','Get', req, res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error getting role details"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
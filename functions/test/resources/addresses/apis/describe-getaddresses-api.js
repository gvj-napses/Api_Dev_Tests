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
const getAddressQuery = require("resources/addresses/queries/get-addresses-query");
const getAddressValidation = require('resources/addresses/validators/get-address-validation');


describe('get addresses of user api', ()=>{
    let sandbox=sinon.createSandbox();
    let id = uuid.v4();
    let req =  {
        params : {
            userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
        }
    }
    //sandbox.stub(uuid,'v4').returns(id)
    beforeEach(()=>{
        res={
            setHeader: sandbox.spy(),
            send: sandbox.spy(),
            status: sandbox.spy(()=>{
                return res;
            })
        }
    })
    
    it('should get address for an user when all the data is provided correctly', async() => {
       

       sandbox.mock(getAddressValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(getAddressQuery);
            expect(query.details.userId).to.be.eql("d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f");
       }))
       .returns(resolveOk({
        name : "door-no- 102-5-313",
        city : "RJY",
        street : "GPR",
        country : "India",
       }))


       const response =  await TestRoutes.execute('/users/:userId/addresses','Get',req,res);

       expect(response).to.be.eql({
        entity:{  name : "door-no- 102-5-313",
        city : "RJY",
        street : "GPR",
        country : "India"},
        status: true,
        message:'Successfully retreived addresses'
    })
       
    })


    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(getAddressValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of userId'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/users/:userId/addresses','Get', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of userId']))
    })
    



    it('should handle error if something goes wrong', async () => {

        sandbox.mock(getAddressValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId/addresses','Get',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error getting addresses from database"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
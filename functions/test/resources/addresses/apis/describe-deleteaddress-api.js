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
const deleteAddressQuery = require("resources/addresses/queries/delete-address-query");
const deleteAddressValidation = require('resources/addresses/validators/delete-address-validation');


describe('get addresses of user api', ()=>{
    let sandbox=sinon.createSandbox();
    let id = uuid.v4();
    let req =  {
        params : {
            userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f",
            addressId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
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
    
    it('should delete address for an user when all the data is provided correctly', async() => {
       

       sandbox.mock(deleteAddressValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
        expect(data.addressId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(deleteAddressQuery);
            expect(query.details.userId).to.be.eql("d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f");
       }))
       .returns(resolveOk({
        userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f",
        addressId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f",
       }))


       const response =  await TestRoutes.execute('/users/:userId/addresses/:addressId','Delete',req,res);

       expect(response).to.be.eql({
        status: true,
        message:'Successfully deleted address',
        entity : {
            userId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f",
            addressId : "d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f"
        }
    })
       
    })


    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(deleteAddressValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of userId'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/users/:userId/addresses/:addressId','Delete', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of userId']))
    })
    



    it('should handle error if something goes wrong', async () => {

        sandbox.mock(deleteAddressValidation).expects('validate').
       withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.userId).to.be.string;
        expect(data.addressId).to.be.string;
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId/addresses/:addressId','Delete',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error in deleting address"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
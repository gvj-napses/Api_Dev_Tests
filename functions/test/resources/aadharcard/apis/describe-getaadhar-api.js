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
const getAadharQuery = require("resources/aadharcard/queries/get-aadhar-query");
const getAadharValidation = require('resources/aadharcard/validators/get-aadhar-validation');


describe('get aadhar details for user api', ()=>{
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

    it('should return aadhar details when id is provided correctly', async() => {
       
        sandbox.mock(getAadharValidation).expects('validate')
        .withArgs(verifyArgs((data) => {
            expect(data).to.be.instanceof(Object)
            expect(data.userId).to.be.string;
        })).
        returns(resolveOk(true))

        sandbox.mock(db).expects('execute')
        .withArgs(verifyArgs((query)=>{
             expect(query).to.be.instanceOf(getAadharQuery);
             expect(query.details.userId).to.be.eql("d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f");
        }))
        .returns(resolveOk({
            "id": "4c3a4e0c-ee5e-4d98-a61c-d7c756244e65",
            "name": "GANNAVARAPU VENKATA JAGANNATH",
            "aadharnumber": "273281632769"
        
        }))
 
        const response =  await TestRoutes.execute('/users/:userId/aadhar','Get',req,res);
 
        expect(response).to.be.eql({
         entity:{ "id": "4c3a4e0c-ee5e-4d98-a61c-d7c756244e65",
         "name": "GANNAVARAPU VENKATA JAGANNATH",
         "aadharnumber": "273281632769",},
         status: true,
         message:'Successfully retreived aadhar details for user'
     })
        
     })
 

    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(getAadharValidation).expects('validate').returns(resolveError(new ValidationError(0,['Bad Value of userId'])))
        sandbox.mock(db).expects('execute').never()
        const response = await TestRoutes.executeWithError('/users/:userId/aadhar','Get', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Bad Value of userId']))
    })
    

     it('should handle error if something goes wrong', async () => {
        sandbox.mock(getAadharValidation).expects('validate')
        .withArgs(verifyArgs((data) => {
            expect(data).to.be.instanceof(Object)
            expect(data.userId).to.be.string;
        })).
        returns(resolveOk(true))

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId/aadhar','Get',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error getting aadhar details for user from database"))

    })



    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
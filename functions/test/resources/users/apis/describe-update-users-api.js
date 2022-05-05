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
const updateUserQuery = require("resources/users/queries/update-user-query");
const updateUserValidation = require('resources/users/validators/update-user-validation');


describe('update user api', ()=>{
    let sandbox=sinon.createSandbox();
    //let id = uuid.v4();
    let req =  {
        body : {
            name : "Jagannath",
            email : "gvj@jj.com",
            mobile : 9121960239
        },
        params : {
            userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"
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
    
    it('should update user when all the data is provided correctly', async() => {
       

       sandbox.mock(updateUserValidation).expects('validate')
       . withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.name).to.be.string;
        expect(data.email).to.be.string;
        expect(data.mobile).to.be.string;
        
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(updateUserQuery);
            expect(query.details.name).to.be.eql("Jagannath");
       }))
       .returns(resolveOk({
        name : "Jagannath",
        email : "gvj@jj.com",
        mobile : 9121960239
       }))


       const response =  await TestRoutes.execute('/users/:userId','Put',req,res);

       expect(response).to.be.eql({
        entity:{ email : "gvj@jj.com",name:"Jagannath",mobile:9121960239},
        status: true,
        message:'Successfully update user'
    })
       
    })


    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(updateUserValidation).expects('validate').returns(resolveError(new ValidationError(0,['Name of the user is mandatory'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/users/:userId','Put', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Name of the user is mandatory']))
    })
    



    it('should handle error if something goes wrong', async () => {

        sandbox.mock(updateUserValidation).expects('validate')
       . withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.name).to.be.string;
        expect(data.email).to.be.string;
        expect(data.mobile).to.be.string;
        
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       
        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users/:userId','Put',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error updating user"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
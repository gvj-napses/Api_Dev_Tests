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
const CreateUserQuery = require("resources/users/queries/create-user-query");
const UserValidation = require('resources/users/validators/create-user-validation');


describe('create user api', ()=>{
    let sandbox=sinon.createSandbox();
    let id = uuid.v4();
    let req =  {
        body : {
            name : "Jagannath",
            email : "gvj@jj.com",
            confirmemail : "gvj@jj.com",
            mobile : 9121960239
        }
    }
    sandbox.stub(uuid,'v4').returns(id)
    beforeEach(()=>{
        res={
            setHeader: sandbox.spy(),
            send: sandbox.spy(),
            status: sandbox.spy(()=>{
                return res;
            })
        }
    })
    
    it('should create user when all the data is provided correctly', async() => {
       

       sandbox.mock(UserValidation).expects('validate')
       . withArgs(verifyArgs((data) => {
        expect(data).to.be.instanceof(Object)
        expect(data.name).to.be.string;
        expect(data.email).to.be.string;
        expect(data.confirmemail).to.be.string;
        expect(data.mobile).to.be.string;
        
    }))
       .returns(resolveOk(true)) // makes sure that validation works fine

       sandbox.mock(db).expects('execute')
       .withArgs(verifyArgs((query)=>{
            expect(query).to.be.instanceOf(CreateUserQuery);
            expect(query.details.name).to.be.eql("Jagannath");
       }))
       .returns(resolveOk({
        name : "Jagannath",
        email : "gvj@jj.com",
        mobile : 9121960239
       }))


       const response =  await TestRoutes.execute('/users','Post',req,res);

       expect(response).to.be.eql({
        entity:{ email : "gvj@jj.com",name:"Jagannath",mobile:9121960239},
        status: true,
        message:'Successfully created user'
    })
       
    })


    it('respond validate errors when incorrect data is provided - name', async ()=>{
        sandbox.mock(UserValidation).expects('validate').returns(resolveError(new ValidationError(0,['Name of the user is mandatory'])))
        sandbox.mock(db).expects('execute').never() // makes sure that this method is never called
        const response = await TestRoutes.executeWithError('/users','Post', req, res);
        expect(response).to.be.eql(new ValidationError(0,['Name of the user is mandatory']))
    })
    



    it('should handle error if something goes wrong', async () => {

        sandbox.mock(UserValidation).expects('validate')
        . withArgs(verifyArgs((data) => {
         expect(data).to.be.instanceof(Object)
         expect(data.name).to.be.string;
         expect(data.email).to.be.string;
         expect(data.confirmemail).to.be.string;
         expect(data.mobile).to.be.string;
         
     }))
        .returns(resolveOk(true)) // makes sure that validation works fine

        sandbox.mock(db).expects('execute').returns(resolveError("Some error occured"))

        const response = await TestRoutes.executeWithError('/users','Post',req,res);

        expect(response).to.be.eql(new ApiError(0,"Some error occured","Error creating user"))

    })

    afterEach(()=>{
    sandbox.verifyAndRestore();
    })
})
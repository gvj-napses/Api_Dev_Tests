const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const CreateUserQuery = require("resources/users/queries/create-user-query");
const R = require('ramda');

describe("create user query", () => {
    let user;
    beforeEach(async () => {
        user = await ds.buildSingle(ds.user) // just creates the data
        // ds.createSingle (Builds data into database)
    })
    
    it('should create a user', async () => {
        // d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f
        const createdUser_obj = await db.execute(new CreateUserQuery(user.id,user.name,user.email,user.mobile))
        verifyResultOk((createdUser)=>{
                expect(createdUser.name).to.be.eql(user.name)
                expect(createdUser.email).to.be.eql(user.email)
                expect(createdUser.mobile).to.be.eq(user.mobile)
                
        })(createdUser_obj)

        const fetchUser = await db.findOne(new RunQuery('select * from public.users where email = :email',{email : user.email}))
        verifyResultOk((createdUser)=>{
            expect(createdUser.name).to.be.eql(user.name)
            expect(createdUser.email).to.be.eql(user.email)
            expect(createdUser.mobile).to.be.eq(user.mobile)
            
    })(fetchUser)
    })

    after(async () => {
        await ds.deleteAll()
    })
})






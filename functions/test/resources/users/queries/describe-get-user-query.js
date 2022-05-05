const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const getUserQuery = require("resources/users/queries/get-aUser-query");
const R = require('ramda');

describe("get user query", () => {
    let user;
    beforeEach(async () => {
        user = await ds.createSingle(ds.user) // just creates the data
        // ds.createSingle (Builds data into database)
    })
    
    it('should retreive a user', async () => {
        // d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f
        const getUser_obj = await db.execute(new getUserQuery(user.id))
        verifyResultOk((createdUser)=>{
                expect(createdUser.name).to.be.eql(user.name)
                expect(createdUser.email).to.be.eql(user.email)
                expect(createdUser.mobile).to.be.eq(user.mobile)
                
        })(getUser_obj)

        const fetchUser = await db.findOne(new RunQuery('select * from public.users where id = :id',{id : user.id}))
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






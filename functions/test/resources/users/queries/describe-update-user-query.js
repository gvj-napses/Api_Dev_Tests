const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const updateUserQuery = require("resources/users/queries/update-user-query");
const R = require('ramda');

describe("update user query", () => {
    let user;
    beforeEach(async () => {
        user = await ds.createSingle(ds.user)
        // ds.createSingle (Builds data into database)
        user.name = "cr7"
        user.email = "gvj@napses.com"
        user.mobile = 9121960239 // changing data for updation
    })
    
    it('should update a user', async () => {
        // d72b90dd-6e8b-42dc-a0a9-5f1ba329cc0f
        const updateUser_obj = await db.execute(new updateUserQuery(user.id,user.name,user.email,user.mobile))

          verifyResultOk((createdUser)=>{
                expect(createdUser).to.be.eql([1]) // means updated
               
                
        })(updateUser_obj)

        const fetchUser = await db.findOne(new RunQuery('select * from public.users where id = :id',{id : user.id}))
        verifyResultOk((createdUser)=>{
            expect(createdUser.name).to.be.eql(user.name)
            expect(createdUser.email).to.be.eql(user.email)
            expect(createdUser.mobile).to.be.eq(user.mobile.toString())
            
    })(fetchUser)
    })

    after(async () => {
        await ds.deleteAll()
    })
})






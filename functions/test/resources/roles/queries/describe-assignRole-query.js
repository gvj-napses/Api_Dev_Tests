const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const CreaterolesQuery = require("resources/roles/queries/assign-role-query");

describe("assign role to user", () => {
    let user,roles;
    beforeEach(async () => {
        user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        //roles = await ds.buildSingle(ds.role,{user})
        roles = {id : "accab206-0fde-4203-a1e0-16bbdb35621b",name : "CEO"}
    })
    it('should create a roles for given user', async () => {
        const createdrolesCardResponse = await db.execute(new CreaterolesQuery(uuid.v4(),user.id,roles.id))
        verifyResultOk(
            (createdrolesCard) => {
                expect(createdrolesCard[0].userId).eq(user.id)
                expect(createdrolesCard[0].roleId).eq(roles.id)
            }
        )(createdrolesCardResponse)

        const fetchrolesCardResponse = await db.findOne(new RunQuery("select * from public.roles where id=:id",{id:roles.id}))
        verifyResultOk(
            (fetchrolesCard) => {
                expect(roles.name).eq(fetchrolesCard.name)
                
            }
        )(fetchrolesCardResponse)
    })
    after(async () => {
        await ds.deleteAll()
    })
})
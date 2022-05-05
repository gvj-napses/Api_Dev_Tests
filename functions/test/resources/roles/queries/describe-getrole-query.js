const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const getRolesQuery = require("resources/roles/queries/get-role-query");

describe("get role details", () => {
    let roles;
    beforeEach(async () => {
        //user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        //roles = await ds.createSingle(ds.role,{user})
        roles = {id : "accab206-0fde-4203-a1e0-16bbdb35621b",name : "CEO"}
    })
    it('should get roles details', async () => {
        const createdrolesCardResponse = await db.execute(new getRolesQuery(roles.id))
        verifyResultOk(
            (createdrolesCard) => {
                //console.log(createdrolesCard)
                expect(createdrolesCard[0].id).eq(roles.id)
            }
        )(createdrolesCardResponse)

        const fetchrolesCardResponse = await db.findOne(new RunQuery("select * from public.roles where id=:id",{id:roles.id}))
        verifyResultOk(
            (fetchrolesCard) => {
                expect(roles.id).eq(fetchrolesCard.id)
                
            }
        )(fetchrolesCardResponse)
    })
    after(async () => {
        await ds.deleteAll()
    })
})
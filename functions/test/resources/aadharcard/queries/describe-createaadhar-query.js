const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const CreateAadharCardQuery = require("resources/aadharcard/queries/create-aadhar-query");
describe("create aadhar query", () => {
    let user,aadhar;
    beforeEach(async () => {
        user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        aadhar = await ds.buildSingle(ds.aadhar,{user})
        //console.log("add",aadhar,user)
    })
    it('should create a aadhar for given user', async () => {
        const createdAadharCardResponse = await db.execute(new CreateAadharCardQuery(user.id, aadhar.id, aadhar.name, aadhar.aadharnumber))
        verifyResultOk(
            (createdAadharCard) => {
                //console.log("AADDD",createdAadharCard)
                expect(createdAadharCard.name).eq(aadhar.name)
                expect(createdAadharCard.aadharnumber).eq(aadhar.aadharnumber.toString())
            }
        )(createdAadharCardResponse)
        const fetchAadharCardResponse = await db.findOne(new RunQuery("select * from public.aadharcarddetails where id=:id",{id:aadhar.id}))
        verifyResultOk(
            (fetchAadharCard) => {
                expect(aadhar.name).eq(fetchAadharCard.name)
                expect(aadhar.aadharnumber.toString()).eq(fetchAadharCard.aadharnumber)
            }
        )(fetchAadharCardResponse)
    })
    after(async () => {
        await ds.deleteAll()
    })
})
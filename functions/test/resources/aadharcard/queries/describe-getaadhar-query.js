const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const getAadharCardQuery = require("resources/aadharcard/queries/get-aadhar-query");

describe("get aadhar query", () => {
    let user,aadhar;
    beforeEach(async () => {
        //user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        aadhar = await ds.createSingle(ds.aadhar)
        //console.log("add",aadhar)
    })

    it('get aadhar for given user', async () => {
        const fetchedAadharCardResponse = await db.execute(new getAadharCardQuery(aadhar.user.id))
        verifyResultOk(
            (createdAadharCard) => {
                //console.log("AADDD",createdAadharCard)
                expect(createdAadharCard.name).eq(aadhar.name)
                expect(createdAadharCard.aadharnumber).eq(aadhar.aadharnumber.toString())
            }
        )(fetchedAadharCardResponse)

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
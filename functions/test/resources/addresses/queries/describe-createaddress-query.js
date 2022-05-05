const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const CreateAddressQuery = require("resources/addresses/queries/create-address-query");

describe("create address query", () => {
    let user,address;
    beforeEach(async () => {
        user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        address = await ds.buildSingle(ds.address,{user})
        //console.log("add",address,user)
    })
    it('should create a address for given user', async () => {
        const createdaddressCardResponse = await db.execute(new CreateAddressQuery(address.id,address.name, address.street, address.city,address.country,user.id))
        verifyResultOk(
            (createdaddressCard) => {
                //console.log("AADDD",createdaddressCard)
                expect(createdaddressCard.name).eq(address.name)
                expect(createdaddressCard.city).eq(address.city)
                expect(createdaddressCard.street).eq(address.street)
                expect(createdaddressCard.country).eq(address.country)

            }
        )(createdaddressCardResponse)

        const fetchaddressCardResponse = await db.findOne(new RunQuery("select * from public.addresses where id=:id",{id:address.id}))
        verifyResultOk(
            (fetchaddressCard) => {
                expect(address.name).eq(fetchaddressCard.name)
                expect(address.city).eq(fetchaddressCard.city)
                expect(address.street).eq(fetchaddressCard.street)
                expect(address.country).eq(fetchaddressCard.country)
            }
        )(fetchaddressCardResponse)
    })
    after(async () => {
        await ds.deleteAll()
    })
})
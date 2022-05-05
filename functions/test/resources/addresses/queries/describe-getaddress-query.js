const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const GetAddressQuery = require("resources/addresses/queries/get-addresses-query");

describe("get address query", () => {
    let user,address;
    beforeEach(async () => {
        //user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        address = await ds.createSingle(ds.address)
    })
    it('should return address for given user', async () => {
        const createdaddressCardResponse = await db.execute(new GetAddressQuery(address.user.id))
        verifyResultOk(
            (createdaddressCard) => {
                expect(createdaddressCard[0].name).eq(address.name)
                expect(createdaddressCard[0].city).eq(address.city)
                expect(createdaddressCard[0].street).eq(address.street)
                expect(createdaddressCard[0].country).eq(address.country)

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
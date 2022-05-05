const { expect } = require("chai");
const { verifyResultOk, verifyResultError } = require("../../../helpers/verifiers");
const uuid = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("data/run-query");
const deleteAddressQuery = require("resources/addresses/queries/delete-address-query");

describe("delete address query", () => {
    let user,address;
    beforeEach(async () => {
        //user = await ds.createSingle(ds.user)
        //console.log("User details",user)
        // user create
        address = await ds.createSingle(ds.address)
    })
    it('should delete address for given user', async () => {
        const deletedaddressCardResponse = await db.execute(new deleteAddressQuery(address.user.id,address.id))
        verifyResultOk(
            (createdaddressCard) => {
                
                expect(createdaddressCard.userId).eq(null)
            }
        )(deletedaddressCardResponse)

        const fetchaddressCardResponse = await db.findOne(new RunQuery("select *  from public.addresses where id=:addressId",{addressId:address.id}))
        verifyResultOk(
            (fetchaddressCard) => {
                //console.log(fetchaddressCard)
                expect(fetchaddressCard.userId).eq(null)
            }
        )(fetchaddressCardResponse)

    })
    after(async () => {
       await ds.deleteAll()
    })
})
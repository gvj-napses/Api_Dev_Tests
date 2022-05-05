const chai = require('chai')
const expect = chai.expect
const deleteAddressValidation = require('../../../../resources/addresses/validators/delete-address-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('delete address Validation', () => {


    it('should verify userId ', async () => {
        let response = await deleteAddressValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })

    it('should verify addressId ', async () => {
        let response = await deleteAddressValidation.validate({addressId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of addressId')
            }
        )(response)
    })

    it('should be valid when provided all data', async () => {
        let response = await deleteAddressValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506",addressId : "e09c649c-9cdc-479f-addb-7bd6c73b6da7"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
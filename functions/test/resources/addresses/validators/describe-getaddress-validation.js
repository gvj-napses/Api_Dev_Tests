const chai = require('chai')
const expect = chai.expect
const getAddressValidation = require('../../../../resources/addresses/validators/get-address-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('get address Validation', () => {


    it('should verify userId ', async () => {
        let response = await getAddressValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })


    it('should be valid when provided all data', async () => {
        let response = await getAddressValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
const chai = require('chai')
const expect = chai.expect
const createAddressValidation = require('../../../../resources/addresses/validators/create-address-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('create address Validation', () => {

    it('should mandate name', async () => {
        let response = await createAddressValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory!')
            }
        )(response)
    })

    it('should mandate street name', async () => {
        let response = await createAddressValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Street is mandatory!')
            }
        )(response)
    })

    it('should mandate country name', async () => {
        let response = await createAddressValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Country is mandatory!')
            }
        )(response)
    })


    it('should verify userID ', async () => {
        let response = await createAddressValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('UserId should be UUID')
            }
        )(response)
    })


    it('should be valid when provided all data', async () => {
        let response = await createAddressValidation.validate({name : "door-no-102-5-313",street : "GPR",city : "Rajahmundry",country : "INDIA",userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
const chai = require('chai')
const expect = chai.expect
const getaadharValidation = require('../../../../resources/aadharcard/validators/get-aadhar-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('Get an aadhar for User', () => {
   

    it('should verify userID ', async () => {
        let response = await getaadharValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('userId Should be UUID!')
            }
        )(response)
    })

    it('shold be valid when provided all data', async () => {
        let response = await getaadharValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"})
        verifyResultOk(
            (result) => {
                //console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
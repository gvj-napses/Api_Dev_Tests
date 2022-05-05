const chai = require('chai')
const expect = chai.expect
const getUserValidation = require('../../../../resources/users/validators/get-user-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('Get a User Validation', () => {
   
    it('should mandate userID ', async () => {
        let response = await getUserValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })
   

    it('should verify userID ', async () => {
        let response = await getUserValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })

    it('shold be valid when provided all data', async () => {
        let response = await getUserValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"})
        verifyResultOk(
            (result) => {
                //console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
const chai = require('chai')
const expect = chai.expect
const getRoleValidation = require('../../../../resources/roles/validators/get-role-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('get details for the role provided', () => {


   it('should verify roleID ', async () => {
        let response = await getRoleValidation.validate({roleId : "hscs7553"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of roleId')
            }
        )(response)
    })

    
    it('should be valid when provided all data', async () => {
        let response = await getRoleValidation.validate({ roleId : "55aaa3ad-a395-44c8-b517-3098affb3858"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
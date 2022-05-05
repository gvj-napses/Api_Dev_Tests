const chai = require('chai')
const expect = chai.expect
const assignRoleValidation = require('../../../../resources/roles/validators/assign-role-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('assign role for User', () => {

    it('should verify userID ', async () => {
        let response = await assignRoleValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })

   it('should verify roleID ', async () => {
        let response = await assignRoleValidation.validate({roleId : "hscs7553"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of roleId')
            }
        )(response)
    })


    

    it('should be valid when provided all data', async () => {
        let response = await assignRoleValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506", roleId : "55aaa3ad-a395-44c8-b517-3098affb3858"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
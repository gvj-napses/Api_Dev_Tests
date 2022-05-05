const chai = require('chai')
const expect = chai.expect
const updateUserValidation = require('../../../../resources/users/validators/update-user-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('update User Validation', () => {
    it('should mandate name', async () => {
        let response = await updateUserValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory!')
            }
        )(response)
    })

    it('should mandate email', async () => {
        let response = await updateUserValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Email is mandatory!')
            }
        )(response)
    })

    it('valid email address', async () => {
        let response = await updateUserValidation.validate({email : "gvj@napses"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Invalid email!')
            }
        )(response)
    })

    it('should verify userID ', async () => {
        let response = await updateUserValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Bad Value of userId')
            }
        )(response)
    })

    it('shold be valid when provided all data', async () => {
        let response = await updateUserValidation.validate({userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506",name : "gvj",email : "gvj@napses.com",mobile : 9121960239,confirmemail : "gvj@napses.com"})
        verifyResultOk(
            (result) => {
                expect(result).to.empty
            }
        )(response)
    })
    
})
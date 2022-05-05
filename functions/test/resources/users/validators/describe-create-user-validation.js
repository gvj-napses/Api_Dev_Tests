const chai = require('chai')
const expect = chai.expect
const createUserValidation = require('../../../../resources/users/validators/create-user-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('create User Validation', () => {
    it('should mandate name', async () => {
        let response = await createUserValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory!')
            }
        )(response)
    })

    it('should mandate email', async () => {
        let response = await createUserValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Email is mandatory!')
            }
        )(response)
    })

    it('valid email address', async () => {
        let response = await createUserValidation.validate({email : "gvj@napses"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Invalid email!')
            }
        )(response)
    })

    it('should be valid when provided all data', async () => {
        let response = await createUserValidation.validate({ name : "gvj",email : "gvj@napses.com",mobile : 9121960239,confirmemail : "gvj@napses.com"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
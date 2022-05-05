const chai = require('chai')
const expect = chai.expect
const createAadharValidation = require('../../../../resources/aadharcard/validators/create-aadhar-validation')
const {verifyResultError,verifyResultOk} = require('helpers/verifiers')

describe('create aadhar for User', () => {
    it('should mandate name', async () => {
        let response = await createAadharValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory!')
            }
        )(response)
    })

    it('should mandate aadharnumber', async () => {
        let response = await createAadharValidation.validate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Aadhar number is mandatory')
            }
        )(response)
    })

    it('should verify userID ', async () => {
        let response = await createAadharValidation.validate({userId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('userId Should be UUID!')
            }
        )(response)
    })

    it('should verify aadharID ', async () => {
        let response = await createAadharValidation.validate({aadharId : "753a56e9"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('aadharId Should be UUID!')
            }
        )(response)
    })

    it('shold be valid when provided all data', async () => {
        let response = await createAadharValidation.validate({name : "GVJ",aadharnumber : "273281632769",aadharId : "55aaa3ad-a395-44c8-b517-3098affb3858",userId : "753a56e9-2530-44be-8f2d-a4b6ab0a7506"})
        verifyResultOk(
            (result) => {
                console.log(result)
                expect(result).to.empty
            }
        )(response)
    })
    
})
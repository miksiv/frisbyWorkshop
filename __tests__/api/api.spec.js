/**
 * @author
 */
const frisby = require('frisby')
const data = require('../../helpers/data.js')
const {Joi} = require("frisby");
describe('Sample test', function () {
    let userId;
    beforeAll(async () => {
        console.log('before the test', data.genRandomNumber(10, 100))
        data.authenticate(data.token)
    })
    afterAll(async () => {
        console.log('after the test')
    })
    it('Get user collection', async () => {
        await frisby.get(`https://gorest.co.in/public/v2/users/`)
            .expect('status', 200)
            .expect('jsonTypes', '0', {
                id: Joi.number().required(),
                name: Joi.string().required(),
            })
            .then(res=>{
                userId = res.json[0].id
                console.log('First user has an id of:', userId)
            })
            .inspectRequest()
            .inspectResponse()
    });
});
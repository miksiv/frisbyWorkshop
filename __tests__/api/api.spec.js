/**
 * @author
 * @group users
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
        await frisby.get(URLS.users.user)
            .expect('status', 200)
            .expect('jsonTypes', '0', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                gender: Joi.string().valid('male', 'female').required(),
                status: Joi.string().valid('inactive', 'active').required()
            })
            .then(res => {
                userId = res.json[0].id
                console.log('First user has an id of:', userId)
            })
        .inspectRequest()
        .inspectResponse()
        .inspectJSON()
        .inspectBody()
    });

    xit('should ', async () => {
        setTimeout(r => {
            return Promise.resolve()
        }, 1000)
        await frisby.post(`https://gorest.co.in/public/v2/users/${userId}/posts`, {
            id: null,
            user_id: null,
            title: 'small test article',
            body: 'actually a big test article'
        })
            .inspectRequest()
            .inspectRequestHeaders()
    });
});
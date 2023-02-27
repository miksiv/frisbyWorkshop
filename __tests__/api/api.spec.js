/**
 * @author
 * @group users
 */
const frisby = require('frisby')
const data = require('../../helpers/data.js')
const {Joi} = require("frisby");
const moment = require('moment')

let dateInFuture;
describe('Sample test', function () {
    let userId;
    beforeAll(async () => {
        console.log('before the test', data.genRandomNumber(10, 100))
        dateInFuture = moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
        console.log(dateInFuture)
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

    it('should ', async () => {
        /**
         * {
         * "id": 14473,
         * "user_id": 672420,
         * "title": "Est adipisci ubi dolor deleo suscipit crastinus aliquid crapula at.",
         * "due_on": "2023-03-06T00:00:00.000+05:30",
         * "status": "pending"
         * }
         */
        await frisby.post(`${URLS.users.user}${userId}/todos`, {
            body: {
                id: null,
                userId: null,
                title: 'nice title',
                due_on: dateInFuture,
                status: 'pending'
            }
        })
            .inspectRequest()
            .inspectResponse()
    });
});
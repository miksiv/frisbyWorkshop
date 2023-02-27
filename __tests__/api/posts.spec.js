/**
 * @author
 */

const frisby = require('frisby')
const data = require('../../helpers/data.js')
const {Joi} = require("frisby");

let name = data.genRandomNumber(1000000, 99999990) + 'dimazzz'
let email = data.genRandomNumber(1000000, 99999990) + 'test2email@test.te'
let userID
let gender
describe('Users CRUD', function () {
    beforeAll(() => {
        data.authenticate(data.token)

    });
    it('READ users', async () => {
        await frisby.get('https://gorest.co.in/public/v2/users')
            .expect('jsonTypes', '*', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                gender: Joi.string().required(),
                status: Joi.string().required(),
            })
        //  .inspectRequest()
        //  .inspectResponse()
    });

    it('POST a new user', async () => {
        await frisby.post('https://gorest.co.in/public/v2/users', {
            id: null,
            name: name,
            email: email,
            gender: 'male',
            status: 'active',
        })
            // .inspectResponse()
            .expect('status', 201)
            .expect('jsonTypes', {
                id: Joi.number().required(),
                name: Joi.string().valid(name).required(),
                email: Joi.string().valid(email).required(),
                gender: Joi.string().valid('male').required(),
                status: Joi.string().valid('active').required(),
            }).then(res => {
                userID = res.json.id
                console.log('this is my user id ' + userID)
            })
    });
    it('GET the created user', async () => {
        await frisby.get('https://gorest.co.in/public/v2/users/' + userID)
            //  .inspectResponse()
            .expect('status', 200)
            .expect('jsonTypes', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                gender: Joi.string().required(),
                status: Joi.string().required(),
            })
    });
    it('PATCH the created user', async () => {
        await frisby.patch('https://gorest.co.in/public/v2/users/' + userID),
            {
                id: null,
                name: name + '_upd',
                email: 'upd_' + email,
                gender: 'female',
                status: 'inactive',
            }

    });

    it('GET the patched user', async () => {
        await frisby.get('https://gorest.co.in/public/v2/users/' + userID)
            //
            .expect('status', 200)
            .expect('jsonTypes', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                gender: Joi.string().required(),
                status: Joi.string().required(),
            })
            .inspectResponse()
            .then(res => {
                name = res.json.name
                gender = res.json.gender
                console.log(name, gender)
            });

    })
    xit('DELETE the created user', async () => {

    });
})
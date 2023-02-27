/**
 * @author Mikhail Sivinskikh <mikhail.sivinskikh@bwt.ee>
 */
const frisby = require('frisby');
const data = require('../../helpers/data.js')
const {Joi} = require("frisby");
//same as const Joi = frisby.Joi;

let email;
let name;
let userId;
describe('Users CRUD', function () {
    beforeAll(() => {
        //authorize here
        data.authenticate(data.token)
        email = data.genRandomNumber(100000, 999999) + 'test@example.com';
        name = data.genRandomNumber(100000, 999999) + 'Test User'
    });

    it.only('READ users', async () => {
        await frisby.get('https://gorest.co.in/public/v2/users')
            .expect('jsonTypes', '*', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                gender: Joi.string().required(),
                status: Joi.string().required()
            })
    });

    it('POST a new user', async () => {
        await frisby.post('https://gorest.co.in/public/v2/users', {
            id: null,
            name: name,
            email: email,
            gender: 'male',
            status: 'Inactive'
        })
            .expect('status', 201)
            .expect('jsonTypes', {
                id: Joi.number().required(),
                name: Joi.string().valid(name).required(),
                email: Joi.string().valid(email).required(),
                gender: Joi.string().valid('male').required(),
                status: Joi.string().valid('inactive').required()
            }).then(res => {
                userId = res.json.id
            })
    });

    it('GET the created user', async () => {
        await frisby.get('https://gorest.co.in/public/v2/users/' + userId)
            .expect('status', 200)
            .expect('jsonTypes', {
                id: Joi.number().valid(userId).required(),
                name: Joi.string().valid(name).required(),
                email: Joi.string().valid(email).required(),
                gender: Joi.string().valid('male').required(),
                status: Joi.string().valid('inactive').required()
            })
    });

    it('PATCH the created user', async () => {
        await frisby.patch('https://gorest.co.in/public/v2/users/' + userId, {
            id: null,
            name: name + '_upd',
            email: 'upd_' + email,
            gender: 'male',
            status: 'active'
        })
            .expect('status', 200)
            .expect('jsonTypes', {
                id: Joi.number().valid(userId).required(),
                name: Joi.string().valid(name + '_upd').required(),
                email: Joi.string().valid('upd_' + email).required(),
                gender: Joi.string().valid('male').required(),
                status: Joi.string().valid('active').required()
            })
    });

    it('DELETE the created user', async () => {
        await frisby.delete('https://gorest.co.in/public/v2/users/' + userId)
            .expect('status', 204)
    });
})
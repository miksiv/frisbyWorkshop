const frisby = require('frisby')
const data = require('./data.js')
const Joi = frisby.Joi

class Users {
    user;

    /**
     * retrieves a user by id
     * @param id {number} - the user id
     * @param status {number} - expected response status
     * @returns {Promise<*>}
     */
    async getUser(id, status) {
        await frisby.get('https://gorest.co.in/public/v2/users/' + id)
            .expect('status', status)
            .expect('jsonTypes', {
                id: Joi.number().valid(id).required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                gender: Joi.string().required(),
                status: Joi.string().required()
            })
            .then(res => {
                this.user = res.json
            })
        return this.user;
    }
}

module.exports = new Users()
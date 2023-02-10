const faker = require('faker');
const frisby = require('frisby')

class Data {
    //TODO: insert your token here
    #token = 'to be filled'

    /**
     * a method to get your token
     * @returns {string} access token
     */
    get token() {
        return this.#token
    }

    /**
     * method to set an access token header to your requests
     * use this to authenticate
     * @param token
     */
    authenticate(token) {
        frisby.globalSetup({
            request: {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        })
    }

    /**
     * A sample helper to generate a random number
     * @param min
     * @param max
     * @returns {number} random number between min and max values
     */
    genRandomNumber(min = 0, max = 9999) {
        return faker.datatype.number({min, max})
    }
}

module.exports = new Data();

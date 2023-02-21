# frisbyWorkshop

## Preparation:

1. Register on github.com
2. Fork this repository into yours
3. Clone it on your local machine
4. run `npm install`
5. Go to https://gorest.co.in/consumer/login and generate a token
6. put your token to a corresponding variable in **_helpers/data.js_**

## After you're done:
1. once you are done with your task, go back to https://github.com/miksiv/frisbyWorkshop
2. open 'Pull requests' and create a new pull request from your fork

## Tasks:

**1. Create a new spec to cover CRUD operations**

URL: https://gorest.co.in/public/v2/users
Use the _**__tests__/api/posts.spec.js**_ as a template, steps as following:
- Authenticate
- Read user collection, validate schema
- Create a User
- validate the response status, 
- validate the response body, 
- save the playerId to a variable
- read the created user, validate the response body and status
- update the created user, validate the response body and status
- delete the created user, validate the response body and status

**2. Optional: add fail tests**
- A request with an incorrect request payload
- Try accessing user that doesn't exist

**3. Optional: Create a functional test**

Using the users, posts, comments, todo URLs from the https://gorest.co.in/ create a test that would mimc a user flow
- create a user
- make a post by this user
- add a comment to that post
- create a todo with a due date in the future. For that you will need to install a new npm package `moment` and use its' api like `moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSZ')`

**4. Optional: refactor the repository code**
- Put common requests into helpers
- Put URLs into a separate storage
- set up exports from these files
- import them into your test spec(s) and reuse them

## Cheat sheet:

### Joi Assertion Samples

String - data type assertion
`Joi.string()`

Number - data type assertion
`Joi.number().min(1).max(10)`

Required - assert that this exact value should be present
`Joi.string().required()`

Valid - assert that this exact value is equal to a provided value
`Joi.string().valid('a')`

Any - non-data type assertion
`Joi.any().allow('a')`

Optional - assertion that this value can exist
`Joi.string().optional()`

Array - data type assertion, can be used to verify values too
`Joi.array().items(Joi.string().valid('a', 'b'))`

Regex - to check that string matches a particular regex
`Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)`

### Building a response assertion

We can assert many parameters of the received response, like `url`, `status`, `statusText`, `headers` and, of course, `body`

Each of those can be asserted using a syntax like `expect('parameter_name', 'expected_value'')`

The body is represented by a json, so we can assert it by a construction like: `.expect('json', 'title', 'JSON Feed')`

But! there's a more agile way to do so, the `jsonTypes` assertion method is similar to `json`, but it provides a way to check the data types of the values in the response body.

Assert the element with index 0 in the response body: `.expect('jsonTypes', '0', {//some assertions})`

Assert that there's at least one element in the response body to match the criteria: `.expect('jsonTypes', '?', {//some assertions})`

Assert that all elements in the response body match the criteria: `.expect('jsonTypes', '*', {//some assertions})`

Asserting an element inside the json object by its' path: ` .expect('jsonTypes', 'data.items.etc...', {//some assertions}`

### REST API
use https://gorest.co.in/rest-console for manual testing

check https://gorest.co.in/ for documentation

### Faker docs:
https://www.npmjs.com/package/@faker-js/faker

### Frisby docs:
https://docs.frisbyjs.com/introduction/readme

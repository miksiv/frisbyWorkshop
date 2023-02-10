# frisbyWorkshop

## Preparation:

1. Register on github.com
2. Fork this repository into yours
3. Clone it on your local machine
4. run `npm install`
5. Go to https://gorest.co.in/consumer/login and generate a token
6. put your token to a corresponding variable in **_helpers/data.js_**

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

### REST API
use https://gorest.co.in/rest-console for manual testing

check https://gorest.co.in/ for documentation

### Faker docs:
https://www.npmjs.com/package/@faker-js/faker

### Frisby docs:
https://docs.frisbyjs.com/introduction/readme

### Joi Assertion Samples

String
`Joi.string()`

Number
`Joi.number().min(1).max(10)`

Required
`Joi.string().required()`

Any
`Joi.any().allow('a')`

Optional
`Joi.string().optional()`

Array
`Joi.array().items(Joi.string().valid('a', 'b'))`

Regex
`Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)`

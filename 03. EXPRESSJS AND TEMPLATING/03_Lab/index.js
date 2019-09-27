const express = require('express')
const app = express();
const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
})

app.get('/', (req, res) => {
    console.log('Hello!')
    res.status(200)
    res.send('Welcome to Express.js!')
})

// console.log(app.param)
// app.param(['id', 'page'], function (req, res, next, value) {
//     console.log('CALLED ONLY ONCE with', value)

//     next()
// })

// app.get('/user/:id/:page', function (req, res, next) {
//     console.log('although this matches')
//     next()
// })

// app.get('/user/:id/:page', function (req, res) {
//     console.log('and this matches too')
//     res.end()
// })
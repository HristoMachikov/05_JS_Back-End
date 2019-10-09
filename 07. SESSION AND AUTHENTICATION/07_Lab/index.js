const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

function auth(req, res, next) {
    const authUser = user.find(user => user.id === req.session.userId);
    if (!authUser) {
        res.status(401).send("401");
        return;
    }
    req.user = authUser;
    next();
}

const user = [
    {
        id: 1,
        username: "user1",
        password: "123"
    }
];

app.use(cookieParser());

app.use(session(
    { secret: 'my secret' },
    { httpOnly: true },
    { secure: true }
));
app.use(bodyParser.urlencoded());

app.get('/protected', auth, (req, res) => {
    res.send('This is protected!');
})

app.get('/logout', (req, res) => {
    res.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
            return;
        }
        res.redirect('/');
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'));
});

app.post('/login', (req, res) => {
    const authUser = user.find(user => user.username === req.body.username);
    if (!authUser) {
        res.sendFile(path.resolve('pages', 'login.html'));
        return;
    }
    req.session.userId = authUser.id
    res.redirect('/');
});


app.get('/', (req, res) => {
    res.cookie('test_cookie', { TEST: 123 });
    res.send('Hello World!');
});



app.get('/1', (req, res) => {
    res.cookie('test_cookie_1', { TEST: 123111 }).send('1');
});

app.get('/readCookie', (req, res) => {
    res.json(req.cookies);
})



app.get('/setSession', (req, res) => {
    req.session.message = "hello"
    res.end('Session set')
})
app.get('/readSession', (req, res) => {
    res.json(req.session)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const options = { expiresIn: '2d' };
const secret = 'MySuperPrivateSecret';

const saltRounds = 9;

function auth(req, res, next) {
    const token = req.cookies['auth_cookie'];
    if (!token) {
        res.status(401).send("401");
        return;
    }
    const decodedToken = jwt.verify(token, secret);
    const authUser = users.find(user => user.id === decodedToken.userId);
    if (!authUser) {
        res.status(401).send("401");
        return;
    }
    req.user = authUser;
    next();
}

let users = [
    {
        id: 1,
        username: "user1",
        password: "123"
    }
];

app.use(cookieParser());

// app.use(session(
//     { secret: 'my secret' },
//     { httpOnly: true },
//     { secure: true }
// ));
app.use(bodyParser.urlencoded());

app.get('/protected', auth, (req, res) => {
    res.send('This is protected!');
})

app.get('/logout', (req, res) => {
    //blacklist
    res.clearCookie('auth_cookie').redirect('/');
    // res.session.destroy((err) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send(err.message);
    //         return;
    //     }
    //     res.redirect('/');
    // });
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('pages', 'register.html'));
});

app.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user) {
        res.sendFile(path.resolve('pages', 'register.html'));
        return;
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            next(err);
            return;
        }
        users = users.concat({ id: 2, username, password: hash });
        res.redirect('/');
    })
    })


});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'));
});

app.post('/login', (req, res, next) => {
    const authUser = users.find(user => user.username === req.body.username);
    if (!authUser) {
        res.sendFile(path.resolve('pages', 'login.html'));
        return;
    }
    bcrypt.compare(req.body.password, authUser.password).then(result => {
        if (!result) {
            res.sendFile(path.resolve('pages', 'login.html'));
            return;
        }
        const token = jwt.sign({ userId: authUser.id }, secret, options);
        res.cookie('auth_cookie', token);
        // req.session.userId = authUser.id;
        res.redirect('/');
    }).catch(next);
});


app.get('/', (req, res) => {
    res.cookie('test_cookie', { TEST: 123 });
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
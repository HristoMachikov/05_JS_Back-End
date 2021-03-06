const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const saltRounds = 9;

function auth(req, res, next) {
    const authUser = users.find(user => user.id === req.session.userId);
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

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('pages', 'register.html'));
});


//bcrypt
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
    });
});
//

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'));
});

//bcrypt
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
        req.session.userId = authUser.id;
        res.redirect('/');
    }).catch(next);
});
//

// app.post('/login', (req, res) => {
//     const authUser = users.find(user => user.username === req.body.username);
//     if (!authUser) {
//         res.sendFile(path.resolve('pages', 'login.html'));
//         return;
//     }
//     req.session.userId = authUser.id
//     res.redirect('/');
// });


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

//create session
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
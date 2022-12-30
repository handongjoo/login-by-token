const express = require('express');

const app = express();
const port = 3000;

app.get('/users', (req, res) => {
    res.send("users");
});

app.post('/login', (req, res) => {
    res.send("login");
});

app.post('/logout', (req, res) => {
    res.send("logout");
});

app.post('/register', (req, res) => {
    res.send("register");
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
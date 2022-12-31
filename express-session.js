const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();

// cookie-parser 미들웨어 사용
app.use(cookieParser());
// json 형식의 body 데이터 사용
app.use(express.json());
// 객체 생성
const sessionObj = {
    // secret(필수옵션) : session key, 세션 및 쿠키를 확인할 때 사용
    secret: 'kong',
    // resave : 요청 시 마다 세션이 수정되지 않은 경우에도 세션 저장소에 다시 저장되도록 할 때 사용
    resave: false,
    // saveUninitialized : 요청 시 새로 생성된 session에 작업이 이루어지지 않아도 저장하도록 할 때 사용
    saveUninitialized: true,
    // store : 세션을 저장하는 곳, 여기선 memorystorer 모듈을 이용하여 새로운 저장소를 생성 함
    store: new MemoryStore(),
};
// express-session 미들웨어를 사용한다는 의미?
app.use(session(sessionObj));

const users = [
    {id: "handongjoo"},
    {id: "hanpotato"},
    {id: "podong"}
];

// 유저 정보 확인
app.get('/users', (req, res) => {
    // req.session의 userid 값을 userId에 할당
    const userId = req.session.userid;
    //생략
    const user = users.find(user => user.id === userId);
    console.log(userId);
    console.log(req.session);
    res.send(user);
});

app.post('/login', (req, res) => {
    // body 값으로 userId를 보내준다.
    const userId = req.body.userId;
    // 생략
    const user = users.find(user => user.id === userId);
    // session의 userid 값에 user.id 값을 할당한다.
    req.session.userid = user.id;
    res.send(user.id);
});
app.post('/logout', (req, res) => {
    res.send("logout page");
});
app.post('/register', (req, res) => {
    res.send("register page");
});


app.listen(3000, () => {
    console.log("서버 연결");
});
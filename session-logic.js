const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// cookie-parser 미들웨어 사용
app.use(cookieParser());
// json 형식의 body 데이터 사용
app.use(express.json());

// 임의의 데이터 배열 생성
const users = [
    {id: "handongjoo"},
    {id: "hanpotato"},
    {id: "podong"}
];

// 임의의 세션 저장소 생성
const sessions = [];

// 유저 정보 확인
app.get('/users', (req, res) => {
    // 세션 저장소에서 값을 찾는다 (배열(sessions)안의 객체(session) 하나하나를 돌면서 (1) session.ssid값과 (2)클라이언트가 전달한 쿠키값 중 키 값이 ssid인 값이 동일한 데이터를 찾는다.)
    const user = sessions.find(session => session.ssid === req.cookies.ssid);
    console.log(sessions);
    console.log(user);
    // 위에서 찾은 user의 데이터 중 id의 값을 id라는 새로운 key의 value 값으로 전달한다.
    res.send({id: user.id});
});

// 로그인 하기
app.post('/login', (req, res) => {
    // body에 userId 값을 넣어 보내주겠다.
    const {userId} = req.body;
    // users를 돌면서 값을 찾는다(users 안에 있는 (1)user.id 값과 (2)내가 body 데이터로 전달한 userId 값이 동일한 데이터를 찾는다.)
    const user = users.find(user => user.id === userId);
    // ssid에 = Date라는 객체의 시간을 문자열로 반환해준(toString()) 값을 넣는다.
    const ssid = Date.now().toString();
    // 세션 저장소에 user에서 찾은 값과 ssid 값을 추가하여 객체를 생성한다.
    sessions.push({
        ...user,
        ssid
    });
    console.log(sessions);
    // 쿠키 값을 key("ssid"):value(ssid)로 보내준다.  
    res.cookie("ssid", ssid);

    res.send(user.id);
});

app.post('/logout', (req, res) => {
    res.send("logout page");
});

app.post('/register', (req, res) => {
    res.send("register page");
});

// 서버 오픈
app.listen(3000, () => {
    console.log("서버 연결")
});
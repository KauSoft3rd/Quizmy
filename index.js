import express from 'express';
import dotenv from 'dotenv';
import { healthRoute } from './src/routes/health.router';
import { newsRouter } from './src/routes/news.router';
import { usersRouter } from './src/routes/users.router';
import { loginRouter } from './src/routes/login.router';
import { remindRouter } from './src/routes/remind.router';
import { quizRouter } from './src/routes/quiz.router';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

/*database.connect();
database.query('SELECT * from User', (error, rows, fields) => {
    if (error) throw error;
    console.log("TEST");
});*/

app.get('/', function (req, res) { 
    res.send('Hello World');
});

app.use('/news', newsRouter);
app.use('/health', healthRoute);
app.use('/mypage', usersRouter);
app.use('/auth', loginRouter);
app.use('/remind', remindRouter);
app.use('/quiz', quizRouter);
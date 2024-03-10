import mysql from 'mysql';

export const database = mysql.createConnection({
    host: "quizmydb.cpiwaee4eftz.ap-northeast-2.rds.amazonaws.com",
    user: "quizmy",
    password: "eksrufthgkr2024!",
    database: "QuizmyDB"
})


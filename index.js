import express from 'express';
import { healthRoute } from './src/routes/health.router';
import { database } from './src/config/database';
import { newsRouter } from './src/routes/news.router';

const app = express();
const port = 3000;

database.connect();
database.query('SELECT * from User', (error, rows, fields) => {
    if (error) throw error;
    console.log("TEST");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/', function (req, res) { 
    res.send('Hello World');
});

app.use('/news', newsRouter);
app.use('/health', healthRoute);
import express from 'express'
import { healthRoute } from './src/routes/health.router'

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/health', healthRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
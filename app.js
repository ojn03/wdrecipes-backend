const express = require('express')
const app = express()

app.use(express.json())

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/wdrecipes'

app.listen(port)
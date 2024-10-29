const express = require('express');
const cors = require('cors');
const notFoundHandler = require('./middlewares/not-found');
const handlerError = require('./middlewares/error');


const app = express()
app.use(cors())

app.use(express.json())




app.use('*', notFoundHandler);
app.use(handlerError);


module.exports = app;
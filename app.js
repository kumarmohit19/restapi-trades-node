const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectionManager = require('./connection')
const indexRouter = require('./routes/index');
const tradesRouter = require('./routes/trades');

const app = express();
connectionManager.getConnection();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/trades', tradesRouter);
app.use('/', indexRouter);
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
       .send(err.message || 'Something went wrong.')
})

module.exports = app;

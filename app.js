const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const getDeviceInfoRouter = require('./routes/getDeviceInfo');
const getAllDevicesRouter = require('./routes/getAllDevices');
const getDeviceServicesRouter = require('./routes/getDeviceServices');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})



// ROUTES:
app.use('/getDeviceInfo', getDeviceInfoRouter);
app.use('/getAllDevices', getAllDevicesRouter);
app.use('/getDeviceServices', getDeviceServicesRouter);


module.exports = app;

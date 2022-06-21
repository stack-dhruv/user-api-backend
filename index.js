const express = require('express');
const mongoose = require('mongoose');


const path = require('path');
const app = express();

// parsing the request body into json
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const uri = 'mongodb://localhost:27017/user-api'; 
const uri = 'mongodb+srv://test:test1234@node-app.4kvc5.mongodb.net/node-api?retryWrites=true&w=majority';

// database connection
mongoose.connect(uri)
.then(() => {console.log('------\nDatabase is connected\n-------')})
.catch((e) => {console.log(e)});

const userRouter = require('./routes/user');
const hobbyRouter = require('./routes/hobby');
const uploadRouter = require('./routes/upload');
app.use('/', userRouter);
app.use('/', hobbyRouter);
app.use('/', uploadRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`-------\nserver is live on ${port}\n-------`);
})
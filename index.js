const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// parsing the request body into json
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const uri = 'mongodb://localhost:27017/user-api'; 
const uri = process.env.DATABASE_URI;

// database connection
mongoose.connect(uri)
.then(() => {console.log('\t\t\t === Database is connected ===')})
.catch((e) => {console.log(e)});

const userRouter = require('./routes/user');
const hobbyRouter = require('./routes/hobby');
const uploadRouter = require('./routes/upload');
app.use('/', userRouter);
app.use('/', hobbyRouter);
app.use('/', uploadRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`\t\t\t === Server is live on ${port} ===`);
})
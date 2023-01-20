const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use('/uploads', express.static('uploads'))
//for parsing multipart form data
// app.use(upload.array()); 
app.use(express.static('public'));
// Import routes
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');


//Router MIddlewares
app.use('/', userRoute);
const fetchUser = require('./middleware/fetchUser');
app.use('/posts', fetchUser, postRoute);


module.exports = app;

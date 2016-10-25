var express = require('express');
var app = express();
var userRouter = require('./routers/users.js')
var tripRouter = require('./routers/trips.js')

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/users', userRouter);

app.use('/trips', tripRouter);


app.listen(3000, function() {
  console.log('Listening on port 3000');
});
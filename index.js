var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

// Connect to MongoDB 
const url = `mongodb://localhost:27017/test-db`;

const connectionParams={
    useNewUrlParser: true,
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

// Using bodyparser to parse json data
app.use(bodyparser.json());

const agency = require('./routes/agencyRoute');

// User Routes
app.use('/api/agency', agency);

// Creating server
const port = 3000;
app.listen(port, () => {
    console.log("Server running at port: " + port);
});
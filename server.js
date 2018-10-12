const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const app = express();

//parse requests of content-type json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//connect to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser:true
}).then(()=>{
    console.log("Database successfully connected");
}).catch((err)=>{
    console.log("Error connecting to the database", err);
    process.exit();
})

//simple test route
app.get('/', (req, res) =>{
    res.json({"message":"hi there"});
})

//configure the app to listen to a specific port
app.listen(3000, ()=>{
    console.log("Server Listening on port 3000");
})
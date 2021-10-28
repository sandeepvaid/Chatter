const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatter_devlopment');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to db'));

db.once('open' , ()=>{
    console.log('Connected to database successfully');
});


module.exports = db;
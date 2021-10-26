const express = require('express');
const app = express();
const port = 8000;

//Importing the express layouts
const expressLayouts = require('express-ejs-layouts');
//use the express layouts before it work with routes
app.use(expressLayouts);
//set up static files
app.use(express.static('./assets'));

//set up the way to handle substyle and scripts in our html file
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//Use express router 
app.use('/',require('./routes'));

//Setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{

    if(err){
        console.log(`Error occurs on running the server: ${err}`);
        return ;
    }

    console.log(`The server is up and running on port: ${port}`);
    
});
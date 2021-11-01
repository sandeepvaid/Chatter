const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
//Importing the express layouts
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


//Import express session for encryption of session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//Importing the connect mongo for storing the session cookie
const MongoStore = require('connect-mongo');

//IMport sass middle wear for styling
const sassMiddleware = require('node-sass-middleware');
//using scss middleware
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))

app.use(cookieParser());
//use the express layouts before it work with routes
app.use(expressLayouts);
//set up static files
app.use(express.static('./assets'));
//To decoded the post request we use urlencoded
app.use(express.urlencoded());


//set up the way to handle substyle and scripts in our html file
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to strore the session cookie in db
app.use(session({
    name: 'Chatter',
    //Todo before deployment
    secret: 'something',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
        // mongooseConnection: db,
        mongoUrl:'mongodb://localhost/chatter_devlopment',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || "Connect-mongodb setup store");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router 
app.use('/',require('./routes'));


app.listen(port,(err)=>{

    if(err){
        console.log(`Error occurs on running the server: ${err}`);
        return ;
    }

    console.log(`The server is up and running on port: ${port}`);
    
});
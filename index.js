const express = require('express');
const app = express();

const port = 8000;



app.listen(port,(err)=>{

    if(err){
        console.log(`Error occurs on running the server: ${err}`);
        return ;
    }

    console.log(`The server is up and running on port: ${port}`);
    
});
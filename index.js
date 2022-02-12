const express                           = require('express');
const app                               = express();
const mongodb                           = require('mongodb');
const bodyparser                        = require('body-parser');
const fs                                = require('fs');
const http                              = require('http');
const express_session                   = require('express-session');
const port                              = "3000"

app.use("/Public", express.static('./Public/'));


app.get('/', (req, res)=>{
    res.render('index.ejs')
})
app.get('/hotel', (req, res)=>{
    res.render('hotel.ejs')
})




// custom 404 page
app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.send('<div style="margin-top: 10%; text-align: center;"><p>error<span style="color: red;"> signal</span></p><h1 style="font-size: 900%;">404</h1><br><div style="marging-left: 20%;"><p style="background-color:red; padding: 1%;">Oops!, We were not able to find the page you are looking for</p></div></div>');
 });

// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
    });


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
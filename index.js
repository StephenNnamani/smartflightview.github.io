const express                           = require('express');
const app                               = express();
const mysql                             = require('mysql');
const bodyparser                        = require('body-parser');
const fs                                = require('fs');
const http                              = require('http');
const express_session                   = require('express-session');
const port                              = process.env.port
const dotenv                            = require('dotenv').config()
var Amadeus                             = require('amadeus');

// ------------------------ AMADEUS CALLS ---------------------------
// var amadeus = new Amadeus({
//   clientId: process.env['AMADEUS_CLIENT_ID'],
//   clientSecret: process.env['AMADEUS_CLIENT_SECRET']
// });

var amadeus = new Amadeus({
  clientId:       process.env.AMADEUS_CLIENT_ID,
  clientSecret:   process.env.AMADEUS_CLIENT_SECRET
})

// fetching data from HTML files
// let townFrom = document.getElementById('townFrom').value


// ----------------------- External CSS and Images server ------------------
app.use("/Public", express.static('./Public/'));

// -------------------------- Importing routes ----------------------
var hotelRouter   = require('../smartflightview.github.io/routes/hotels')
var flightRouter  = require('../smartflightview.github.io/routes/flights')
var visaRouter    = require('../smartflightview.github.io/routes/visa')

// Getting all the necessary Routes
// -------------- Index -------------------------
// var townFrom            = "ABJ",  countryTo           = "SYN",  departureDate       = "2022-02-29",
//   returnDate          = "2023-04-22",
//   adults              = 3,
//   minor               = 5,
//   flightClass         = "Economy"
// fetch('https://test.api.amadeus.com/v3').then((data)=>{
//         console.log(data)
//     })
    amadeus.shopping.flightOffersSearch.get({ 
      originLocationCode: 'BOS', 
      destinationLocationCode: 'LON', 
      departureDate: '2020-08-01', 
      adults: '2' 
    }).then(function (data) { 
      console.log(JSON.stringify(data)); 
    }).catch(function (responseError) { 
      console.log(JSON.stringify(responseError)); 
    }); 

  app.get('/', (req, res)=>{
    res.render('index.ejs')
// app.get('/', (req, res)=>{
//     res.render('index.ejs')
//     fetch('https://test.api.amadeus.com/v3').then((data)=>{
//         console.log(data)
//     })
//     amadeus.shopping.flightOffersSearch.get({
//       originLocationCode:             `${townFrom}`,
//       destinationLocationCode:        `${countryTo}`,
//       departureDate:                  `${departureDate}`,
//       returnDate:                     `${returnDate}`,
//       adults:                         `${adults}`,
//       minor:                          `${minor}`,
//       flightClass:                    `${flightClass}`
//   }).then(function(response){
//     console.log(response.data);
//   }).catch(function(responseError){
//     console.log(responseError.code);
//   });
  
 })
// ----------------- Other External Routes -----------------------
app.get('/hotel', hotelRouter)
app.get('/flight%20search', flightRouter)
app.get('/visa', visaRouter)






//-------------------- custom 404 page ---------------------------
app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.send('<div style="margin-top: 10%; text-align: center;"><p>error<span style="color: red;"> signal</span></p><h1 style="font-size: 900%;">404</h1><br><div style="marging-left: 20%;"><p style="background-color:red; padding: 1%;">Oops!, We were not able to find the page you are looking for</p></div></div>');
 });

//----------------------- custom 500 page -------------------------
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
    });

// --------------------- Port Listener -----------------------------
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
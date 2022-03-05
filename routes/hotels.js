const express = require('express')
const router = express()

router.get('/hotel', (req, res)=>{
    res.render('hotel.ejs')
})
router.get('/hote/hotelsearch', (req, res)=>{
    let hotels = fetch('https://test.api.amadeus.com/v3').then((data)=>{
        console.log(data)
    }).catch('there is an error')
    console.log(hotels)
})

module.exports = router
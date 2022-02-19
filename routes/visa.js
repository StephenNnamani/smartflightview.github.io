const express = require('express')
const router = express()

router.get('/visa', (req, res)=>{
    res.render('visa.ejs')
})

module.exports = router
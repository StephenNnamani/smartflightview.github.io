const express = require('express')
const router = express()

router.post('/', (req, res)=> {
    res.send("Hotel tickets are found here")
})




module.exports = router
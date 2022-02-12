const express = require('express')
const router = express()

router.post('/', (req, res)=> {
    res.send("Visa plans are available here")
})




module.exports = router
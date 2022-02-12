const express = require('express')
const router = express()

router.post('/', (req, res)=> {
    res.send("Air tickets are found here")
})




module.exports = router
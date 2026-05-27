const express = require('express')
const router = express()

router.get('/ticketcategories',(req, res)=>{
    res.status(200).json({
        message: "Halaman Ticket categories",
    });
});


module.exports = router;
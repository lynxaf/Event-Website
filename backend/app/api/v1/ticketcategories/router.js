const express = require('express')
//const router = express()
const router = express.Router();
router.get('/ticketcategories',(req, res)=>{
    res.status(200).json({
        message: "Halaman Ticket categories",
    });
});


module.exports = router;
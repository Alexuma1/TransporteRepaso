var express = require('express')
var router = express.Router()

// Ir a nosotros
router.get('/',function(req,res,next){
res.render('nosotros',{
    isNosotros : true
})
})

module.exports = router;
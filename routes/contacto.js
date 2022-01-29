var express = require('express')
const async = require('hbs/lib/async')
var router = express.Router()
var nodemailer = require('nodemailer')

router.get('/', function (req,res,next){
    res.render('contacto',{
        isContacto : true
    })
})

router.post('/',async function(req,res,next){
    var nombre = req.body.nombre
    var email = req.body.email
    var telefono = req.body.telefono
    var mensaje = req.body.comentarios

    var obj = {
        to: 'm5a97b@gmail.com',
        subject: 'Contacto desde la web de transportes',
        html: nombre + ' se contacto a travez de la web y quiere saber mas info de este correo: '+ email + '<br> Su tel es: ' + telefono + ' <br> Y su comentario fue: ' + mensaje  
    }
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    
      var info = await transport.sendMail(obj)
      res.render('contacto',{
          enviado:'Mensaje enviado correctamente',
          isContacto:true
      })
})

module.exports = router;
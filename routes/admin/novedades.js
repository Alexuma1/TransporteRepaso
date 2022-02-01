var express = require('express')
var router = express.Router()
var novedadesModel = require('../../models/novedadesModels')

router.get('/',async function(req,res,next){

    var novedades = await novedadesModel.getNovedades()


    res.render('admin/novedades',{
        layout:'admin/layout',
        usuario:req.session.nombre,
        novedades
    })
})

// vista del formulario de agregar

router.get('/agregar', function (req,res,next){
    res.render('admin/agregar',{
        layout:'admin/layout'
    })
})

router.post('/agregar', async function (req,res,next){
    try {
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "" ){
            await novedadesModel.insertNovedad(req.body)
            res.redirect('/admin/novedades')
        }else{
            res.render('admin/agregar',{
                layout : 'admin/layout',
                error:true,
                message:'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar',{
            layout:'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        })
    }
})

router.get('/eliminar/:id', async function(req,res,next){
    var id = req.params.id
    await novedadesModel.eliminarNovedadByID(id)
    res.redirect('/admin/novedades')
})

module.exports = router
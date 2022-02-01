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

router.get('/editar/:id', async function (req,res,next){
    var id = req.params.id
    var novedad = await novedadesModel.getNovedadesByID(id)
    res.render('admin/editar',{
        layout:'admin/layout',
        novedad
    })
})

router.post('/editar', async function (req,res,next){
    try {
        var obj={
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo
        }
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModel.editarNovedadByID(obj,req.body.id)
            res.redirect('/admin/novedades')
        }else{
            res.render('admin/editar',{
                layout:'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/editar',{
            layout:'admin/layout',
            error: true,
            message: 'No se edito la novedad'
        })
    }
})

module.exports = router
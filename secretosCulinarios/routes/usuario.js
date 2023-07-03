const express = require('express')
const router = express.Router()
const { cargarPerfil, editarPerfil, eliminarCuenta, cargarRecetasUsuario, cargarError } = require('../controllers/usuarioControl')

router.get('/', function(req,res){
  res.render('errorPersonalizado', {nombrePag: 'Error 404', message: 'No se encontró la página solicitada', status:'404'})
} )

router.get('/perfil', cargarPerfil)
router.post('/perfil', editarPerfil )
router.delete('/perfil/eliminar', eliminarCuenta )

router.get('/recetas', cargarRecetasUsuario)

router.get('/*', cargarError)

module.exports = router;
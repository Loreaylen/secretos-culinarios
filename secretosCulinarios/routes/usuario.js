const express = require('express')
const router = express.Router()
const { cargarPagUsuario, editarPerfil, eliminarCuenta, cargarRecetasUsuario } = require('../controllers/usuarioControl')

router.get('/', function(req,res){
  res.render('errorPersonalizado', {nombrePag: 'Error 404', message: 'No se encontró la página solicitada', status:'404'})
} )
// router.get('/:dir', cargarPagUsuario )

router.post('/perfil', editarPerfil )
router.delete('/perfil/eliminar', eliminarCuenta )

router.get('/recetas', cargarRecetasUsuario)

module.exports = router;
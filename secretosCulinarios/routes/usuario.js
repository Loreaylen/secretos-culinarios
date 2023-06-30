const express = require('express')
const router = express.Router()
const { cargarPagUsuario, editarPerfil, eliminarCuenta } = require('../controllers/usuarioControl')


router.get('/', function(req,res){
  res.render('errorPersonalizado', {nombrePag: 'Error 404', message: 'No se encontró la página solicitada', status:'404'})
} )
router.get('/:dir', cargarPagUsuario )

router.post('/perfil/editar', editarPerfil )
router.post('/perfil/eliminar', eliminarCuenta )

module.exports = router;
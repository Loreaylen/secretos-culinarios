const express = require('express')
const router = express.Router()
const { cargarPagUsuario, mostrarPerfil } = require('../controllers/usuarioControl')


router.get('/', function(req,res){
  res.render('errorPersonalizado', {nombrePag: 'Error 404', message: 'No se encontró la página solicitada', status:'404'})
} )
router.get('/:dir', cargarPagUsuario )

module.exports = router;
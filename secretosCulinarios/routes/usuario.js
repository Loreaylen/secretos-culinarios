const express = require('express')
const router = express.Router()
const multer = require('multer');
const { cargarPerfil, editarPerfil, eliminarCuenta, cargarRecetasUsuario, cargarError,
mostrarVistaAgregarReceta, agregarReceta, eliminarReceta, editarReceta, mostrarVistaEditarReceta,
cambiarContraseña } = require('../controllers/usuarioControl')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); 
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop();
    const fileName = file.originalname.split('.').slice(0, -1).join('.');

    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
  limits: {
      fieldSize: 10 * 1024 * 1024
      }  
});

const upload = multer({storage: storage});

router.get('/', function(req,res){
  res.render('errorPersonalizado', {nombrePag: 'Error 404', message: 'No se encontró la página solicitada', status:'404'})
})
router.get('/perfil', cargarPerfil)
router.get('/recetas', cargarRecetasUsuario)
router.get('/recetas/agregar', mostrarVistaAgregarReceta)
router.get('/recetas/editar/:id', mostrarVistaEditarReceta)
router.get('/*', cargarError)

router.post('/recetas/agregar', upload.single('imagenReceta'), agregarReceta)

router.put('/perfil', upload.single('subirAvatar'), editarPerfil )
router.put('/perfil/cambiarContraseña', cambiarContraseña)
router.put('/recetas/editar/:id', upload.single('imagenReceta'), editarReceta)

router.delete('/perfil/eliminar', eliminarCuenta )
router.delete('/recetas/eliminar/:id', eliminarReceta)

module.exports = router;
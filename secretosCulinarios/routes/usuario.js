const express = require('express')
const router = express.Router()
const { cargarPerfil, editarPerfil, eliminarCuenta, cargarRecetasUsuario, cargarError,
   mostrarVistaAgregarReceta, agregarReceta, eliminarReceta } = require('../controllers/usuarioControl')
const multer = require('multer');

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
} )

router.get('/perfil', cargarPerfil)
router.put('/perfil', upload.single('subirAvatar'), editarPerfil )
router.delete('/perfil/eliminar', eliminarCuenta )

router.get('/recetas', cargarRecetasUsuario)
router.get('/recetas/agregar', mostrarVistaAgregarReceta)
router.post('/recetas/agregar', agregarReceta)
router.delete('/recetas/eliminar/:id', eliminarReceta)

router.get('/*', cargarError)

module.exports = router;
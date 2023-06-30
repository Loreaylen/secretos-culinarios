const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')

const usuarioControl = {
  'cargarPagUsuario': function (req, res) {
    const dir = req.params.dir

    const rutaPorDefecto = {
      vista: 'errorPersonalizado',
      nombrePag: 'Error 404',
      message: 'No se encontró la página solicitada',
      status: '404'
    }
    const subdirectorios = {
      perfil: {
        vista: 'perfil',
        nombrePag: 'Mi perfil',
        success: req.query.success
      },
      recetas: {
        vista: 'recetasUsuario',
        nombrePag: 'Mis recetas'
      },
      favoritos: {
        vista: 'favoritos',
        nombrePag: 'Mis favoritos'
      }
    }
    console.log(dir)
    const irA = subdirectorios[dir] || rutaPorDefecto

    if (!req.session.user) {
      res.render('errorPersonalizado', { nombrePag: 'Error 401', message: 'No estás autorizado. Fuera bicho.', status: '401' })
      return
    }
    res.render(irA.vista, { nombrePag: irA.nombrePag, sesion: req.session.user, success: irA.vista === 'perfil' ? irA.success : undefined, message: irA.vista === 'errorPersonalizado' ? irA.message : null, status: irA.vista === 'errorPersonalizado' ? irA.status : '200' })
  },
  'editarPerfil': async function (req, res) {
   
    const datosBody = req.body
    const sessionUser = req.session.user
    const id = req.session.user.id
    const [data, metadat] = await sequelize.query(`CALL actualizar_perfil(${id}, '${datosBody.nombre}', '${datosBody.usuario}')`)
      sessionUser.nombre = data.nombre;
      sessionUser.usuario = data.usuario;
    res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: true})
     
   
  },
  'eliminarCuenta': async function(req, res){
    try{
      const [respuesta, metadata] = await sequelize.query(`DELETE FROM usuarios WHERE id = ${req.session.user.id}`)
      res.redirect('/')
      return respuesta
    }
    catch (err){
      console.log('no se pudo eliminar el usuario, ', err)
    }
  }
}

module.exports = usuarioControl;
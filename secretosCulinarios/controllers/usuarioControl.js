const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')
const {cerrarSesion} = require('./logoutControl')

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

    try{
      const [data, metadat] = await sequelize.query(`CALL actualizar_perfil(${id}, '${datosBody.nombre}', '${datosBody.usuario}')`)
      sessionUser.nombre = data.nombre;
      sessionUser.usuario = data.usuario;
      res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: true})
    }
    catch(err){
      res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: false})
    }
    
     
   
  },
  'eliminarCuenta': async function(req, res){
    console.log('SESION USER', req.session.user)
    try{
      const [data, metadata] = await sequelize.query(`CALL eliminar_cuenta(${req.session.user.id})`)
      if(data.resultado){
        req.session.destroy(err => {
          if(err){
            console.log('ERROR: no se pudo destruir la sesión')
            return
          }
          console.log('SESION DESTRUIDA')
        })
      return true
      }
      else throw Error('El procedimiento falló')

    }
    catch (err){
      console.log('no se pudo eliminar el usuario, ', err)
    }
  },
  'cargarRecetasUsuario': async function(req,res){
    // const idUser = req.session.user.id
    // const data = await sequelize.query(`CALL traer_recetas(NULL)`, {
    //   nest: true
    // })
    // const listaRecetas = Object.values(data)
    // const dataCategorias = await sequelize.query(`CALL categorias_por_receta(1)`, {
    //   nest: true
    // })
    // console.log(dataCategorias)
    const datos = await sequelize.query(`SELECT u.usuario, u.url_avatar, r.titulo , r.url_imagen, r.pasos, r.createdAt, c.nombre AS categoria
    FROM usuarios_recetas ur
    LEFT JOIN usuarios u
    ON ur.id_usuario = u.id
    LEFT JOIN recetas AS r
    ON ur.id_receta = r.id
    LEFT JOIN categorias_recetas cr
    ON cr.id_receta = r.id
    LEFT JOIN categorias c
    ON c.id_categoria = cr.id_categoria
    ORDER BY ur.id_tabla;`, {
      fieldMap: {
        categoria: categoria
      }
    })
    console.log(datos)
  }
}

module.exports = usuarioControl;
const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')
const Receta = require('../models/ManyToMany/Receta.js')
const Categoria = require('../models/ManyToMany/Categoria.js')

const usuarioControl = {
  'cargarError': function(req, res){
    res.render('errorPersonalizado', {nombrePag: Error, status: '404', message: 'No se encontró la página solicitada'})
  },
  'cargarPerfil': function(req,res){
    res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: req.query.success})
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
    const idUser = req.session.user.id
    const data = await sequelize.query(`SELECT u.usuario, u.url_avatar, r.titulo, r.url_imagen, r.pasos, r.createdAt, GROUP_CONCAT(c.nombre) AS categorias
    FROM categorias_recetas cr
    LEFT JOIN categorias c ON cr.id_categoria = c.id_categoria
    LEFT JOIN recetas r ON cr.id_receta = r.id
    LEFT JOIN usuarios u ON u.id = r.id_usuario
    GROUP BY r.id;`, {
      nest: true
    })
    console.log(data)
   
  
  }
}

module.exports = usuarioControl;
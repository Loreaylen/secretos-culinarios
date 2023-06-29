const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')
const Usuario = require('../models/Usuario')

const loginControl = {
  'mostrarLogin': function(req,res){
    if(req.session.user){
      res.redirect('/')
      return
    }
    res.render('login', {nombrePag: 'Iniciar sesión', sesion: req.session.user || false})
  },
  'iniciarSesion': async function(req,res){
    try {
      const [results, metadata] = await sequelize.query(`CALL login_usuario('${req.body.emailUsuario}')`)
      if(bcrypt.compareSync(req.body.contraseñaUsuario, results.contraseña)){
       const usuario = await Usuario.findOne({where: {mail: req.body.emailUsuario}})
       const usuarioInfo = usuario.dataValues

       req.session.user = {
        id: usuarioInfo.id,
        nombre: usuarioInfo.nombre,
        mail: usuarioInfo.mail,
        usuario: usuarioInfo.usuario,
        avatar: usuarioInfo.url_avatar
       }
       res.redirect('/')
      }
      else throw Error('Password incorrecto')
    }
    catch (err){
      console.log(err)
    }
  }
}

module.exports = loginControl;
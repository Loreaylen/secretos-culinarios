const bcrypt = require('bcrypt')
const Usuario = require('../models/OneToMany/Usuario')


const registerControl = {
  'mostrarForm': function (req, res) {
    if (req.session.user) {
      res.redirect('/')
      return
    }
    
   res.render('register', { nombrePag: 'Registro', resultadosVal: [], sesion: req.session.user })
  },
  'submit': async function (req, res) {
    try {
      
      const usuarioRegistrado = await Usuario.create({
        nombre: req.body.nombre,
        mail: req.body.email,
        usuario: req.body.nombreUsuario,
        contraseña: bcrypt.hashSync(req.body.contraseña, 10)
      })
      console.log('TE REGISTRASTE!')
      res.render('index', { nombrePag: 'Home', sesion: req.session.user })
    }
    catch (err) {
      res.render('error', { nomprePag: 'Error', message: 'Error de registro', error: err })
    }
  }
}

module.exports = registerControl;
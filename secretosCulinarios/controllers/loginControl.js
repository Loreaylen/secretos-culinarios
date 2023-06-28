const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')

const loginControl = {
  'mostrarLogin': function(req,res){
    res.render('login', {nombrePag: 'Iniciar sesión'})
  },
  'iniciarSesion': async function(req,res){
    try {
      const [results, metadata] = await sequelize.query(`CALL login_usuario('${req.body.emailUsuario}')`)
      if(bcrypt.compareSync(req.body.contraseñaUsuario, results.contraseña)){
        console.log('Login exitoso!')
      }
      else throw Error('Password incorrecto')
    }
    catch (err){
      console.log(err)
    }
  }
}

module.exports = loginControl;
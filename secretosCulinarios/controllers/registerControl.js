const bcrypt = require('bcrypt')


const registerControl = {
  'mostrarForm': function(req, res) {
    res.render('register', {nombrePag: 'Registro', resultadosVal: []})
  },
  'submit': function(req, res){
  console.log('TE REGISTRASTE!')
  res.render('index', {nombrePag: 'Home'})
  return
  }
}

module.exports = registerControl;
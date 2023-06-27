const bcrypt = require('bcrypt')

const registerControl = {
  'mostrarForm': function(req, res) {
    res.render('register', {nombrePag: 'Registro', resultadosVal: []})
  },
  'submit': function(req, res){
  res.send('TE REGISTRASTE PAPU')
  return
  }
}

module.exports = registerControl;
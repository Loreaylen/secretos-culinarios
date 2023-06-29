const logoutControl = {
  'cerrarSesion': function(req, res){
    req.session.destroy(function(err){
      if(err){
        console.log('Error al salir de la sesión:', err)
        return
      }
      res.redirect('/login')
    })

    console.log('LA SESION ACTUAL:', req.session)
  }
}

module.exports = logoutControl;
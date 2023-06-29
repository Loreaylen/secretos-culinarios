const usuarioControl = {
  'cargarPagUsuario': function(req, res){
    const dir = req.params.dir

     const rutaPorDefecto = {
      vista: 'errorPersonalizado',
      nombrePag: 'Error 404',
      message: 'No se encontró la página solicitada',
      status:'404'
     }
     const subdirectorios = {
      perfil: {
        vista: 'perfil',
        nombrePag: 'Mi perfil'
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

    //  if(!req.session.user){
    //   res.render('errorPersonalizado', {nombrePag: 'Error 401', message: 'No estás autorizado. Fuera bicho.', status:'401'})
    //   return
    //  }
     res.render(irA.vista, {nombrePag: irA.nombrePag, sesion: req.session.user})
  },
  'mostrarPerfil': function(req, res){
    
  }
}

module.exports = usuarioControl;
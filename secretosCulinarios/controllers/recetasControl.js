


const recetasControl = {
'mostrarTodas': function(req, res) {
res.send('recetass')
},
'buscar': function(req, res){
  res.render('buscarReceta')
},
'mostrarDetalle': function(req, res){
  res.render('vistaDetallada')
}
}

module.exports = recetasControl
const sequelize = require('../database/connect.js')


const recetasControl = {
'mostrarTodas': async function(req, res) {
  const [data, metadata] = await sequelize.query(`CALL traer_recetas(NULL)`, {
    nest: true
  })
  recetas = Object.values(data)
  req.session.recetas = recetas
  res.render('recetas', {nombrePag: 'Todas las recetas', sesion: req.session.user || false, recetas: recetas})
},
'buscar': function(req, res){
  res.render('buscarReceta')
},
'mostrarDetalle': function(req, res){
  const recetas =  req.session.recetas 
  const idReceta = req.params.idReceta
  
  if(typeof recetas !== 'undefined'){
    const receta = recetas.find(el => el.id == idReceta)
    if(typeof receta.categorias === 'string'){
      const arrCategorias = receta.categorias === 'null' ? ['Sin categorías'] : receta.categorias.split(',')
      receta.categorias = arrCategorias
    }
    res.render('vistaDetallada', {nombrePag: receta.titulo, receta: receta, sesion: req.session.user || false})
  }
  else {
    res.render('errorPersonalizado', {nombrePag: Error, status: '404', message: 'Hubo un error al obtener los datos'})
  }
}
}

module.exports = recetasControl
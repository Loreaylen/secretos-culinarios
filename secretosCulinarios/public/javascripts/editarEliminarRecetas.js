const eliminarReceta = $('.eliminarReceta')

for(let boton of eliminarReceta){
  $(boton).on('click', () => {
    const article = $(boton).closest('article')
    console.log('article', $(article).attr('id'))

    fetch(`/usuario/recetas/${$(article).attr('id')}/eliminar?_method=DELETE`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
  })
}
const botonesEditar = $('.botonEditar')
const inputEditable = $('.inputEditable')

console.log(inputEditable)

const editarInput = (nombreInput) => {
  console.log(inputEditable.find(el => $(el).attr('name') === nombreInput))
}

for(let boton of botonesEditar){
  const name = $(boton).attr('name')
  $(boton).on('click', editarInput(name))
}
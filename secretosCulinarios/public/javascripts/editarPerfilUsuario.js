const botonEditar = $(".botonEditar");
const botonGuardar = $(".botonGuardarCambios");
const inputEditable = $(".inputEditable");
const botonEliminar = $(".botonEliminar")
const modal = $(".modal")
const botonConfirmarEliminar = $(".botonConfirmarEliminar")
const botonCancelarEliminar = $(".botonCancelarEliminar")
const containerMensaje = $('.containerMensaje')

const editarInput = () => {
  inputEditable.removeAttr("disabled");
  botonEditar.addClass("invisible");
  botonGuardar.removeClass("invisible");
};

const guardarCambios =  () => {
  const guardar = {};
  for (let input of inputEditable) {
    guardar[$(input).attr("name")] = $(input).val();
  }

  botonGuardar.addClass("invisible");
  botonEditar.removeClass("invisible");
  $(inputEditable).attr("disabled");
 

   fetch("/usuario/perfil", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guardar),
    cache: "default",
  })
  .then((res) => {
      console.log(res);
      setTimeout(() => {
      $(containerMensaje).addClass('invisible')
      }, 1000)
  })
  .catch((err) => console.log("hubo un error: ", err))
  .finally(() => {
    for (let input of inputEditable) {
      $(input).attr("disabled", true)
    }
  })
};

const mostrarMensajeEliminar = () => {
  $(modal).removeClass('invisible')
}

const cancelarEliminacion = () => {
  $(modal).addClass('invisible')
}

const eliminarCuenta =  () => {
  fetch("/usuario/perfil/eliminar", {
  method: "DELETE"
})
.then((res) => {
  console.log(res);
  $(modal).addClass('invisible')
  window.location.replace('http://localhost:3000')
})
.catch((err) => console.log("hubo un error: ", err));
}

botonEditar.on("click", editarInput);
botonGuardar.on("click", guardarCambios);
botonEliminar.on("click", mostrarMensajeEliminar)
botonCancelarEliminar.on("click", cancelarEliminacion)
botonConfirmarEliminar.on("click", eliminarCuenta)
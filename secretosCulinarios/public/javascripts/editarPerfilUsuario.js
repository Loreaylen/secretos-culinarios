const botonEditar = $(".botonEditar");
const botonGuardar = $(".botonGuardarCambios");
const inputEditable = $(".inputEditable");
const botonEliminar = $(".botonEliminar")
const modal = $(".modal")
const botonConfirmarEliminar = $(".botonConfirmarEliminar")
const botonCancelarEliminar = $(".botonCancelarEliminar")

const editarInput = () => {
  inputEditable.removeAttr("disabled");
  botonEditar.addClass("invisible");
  botonGuardar.removeClass("invisible");
};

const guardarCambios = async () => {
  const guardar = {};
  for (let input of inputEditable) {
    guardar[$(input).attr("name")] = $(input).val();
  }

  botonGuardar.addClass("invisible");
  botonEditar.removeClass("invisible");
  $(inputEditable).attr("disabled");
  for (let input of inputEditable) {
    $(input).attr("disabled");
  }

  await fetch("/usuario/perfil/editar", {
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
    })
    .catch((err) => console.log("hubo un error: ", err));
};

const mostrarMensajeEliminar = () => {
  $(modal).removeClass('invisible')
}

const cancelarEliminacion = () => {
  $(modal).addClass('invisible')
}

const eliminarCuenta = async () => {
await  fetch("/usuario/perfil/eliminar", {
  method: "POST"
})
.then((res) => {
  console.log(res);
})
.catch((err) => console.log("hubo un error: ", err));
}

botonEditar.on("click", editarInput);
botonGuardar.on("click", guardarCambios);
botonEliminar.on("click", mostrarMensajeEliminar)
botonCancelarEliminar.on("click", cancelarEliminacion)
botonConfirmarEliminar.on("click", eliminarCuenta)
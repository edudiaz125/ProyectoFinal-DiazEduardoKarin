//Funcion que renderiza las motos del carrito
function renderMotosCarrito() {
  const motos = cargarMotosCarrito();
  let salida = "";

  if (totalMotosCarrito() > 0) {
    salida += `<table class="table">
        <tr>
        <td colspan="5" class="text-end"><button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar Carrito</button></td>
        <tr>`;

    for (moto of motos) {
      salida += `<tr>
            <td><img src="${"images/" + moto.imagen}" alt="${
        moto.marca
      }" width="80" /></td>
            <td>${moto.marca} ${moto.modelo} ${moto.motor} ${moto.color}</td>
            <td>${moto.cantidad} X $${moto.precio}</td>
            <td>$${moto.cantidad * moto.precio}</td>
            <td class="text-end"><button class="btn btn-danger" onclick="eliminarMoto(${
              moto.id
            });" title="Eliminar Moto"><img src="images/trash.svg" alt="Eliminar Moto" width="16" /></button></td>
            </tr>`;
    }

    salida += `<tr>
        <td colspan="3">Total a Pagar</td>
        <td>$${totalPagarCarrito()}</td>
        <td>&nbsp;</td>
        </tr>`;
    salida += `<tr>
        <td colspan="5" class="text-end"><button class="btn btn-success" onclick="botonCompra()">Confirmar compra</button></td>
        </tr>`;
    salida += `</table>`;
  } else {
    salida = `<div class="alert alert-danger text-center" role="alert">No se agregaron motos en el carrito!</div>
      `;
  }
  document.getElementById("motos").innerHTML = salida;
}

//Funcion del boton de confirmar compra
function botonCompra() {
  Swal.fire({
    title: "Confirmas tu compra?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Todo listo!", "Tu compra ha sido confirmada", "success");
      vaciarCarrito();
    }
  });
}
//Si hay motos cargadas, las renderiza y calcula el total, permitiendonos borrarlas. Si no hay motos cargadas todavia, nos lo avisa.

renderMotosCarrito();
renderBotonCarrito();

function guardarMotosCarrito(motos) {
  localStorage.setItem("carrito", JSON.stringify(motos));
}

function cargarMotosCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderMotosCarrito();
  renderBotonCarrito();
} //Nos limpia el carrito

function estaEnElCarrito(id) {
  const carrito = cargarMotosCarrito();

  return carrito.some((item) => item.id === id);
} //Busca si una moto ya fue o no fue cargada al carrito

function agregarAlCarrito(id) {
  const carrito = cargarMotosCarrito();

  if (estaEnElCarrito(id)) {
    let pos = carrito.findIndex((item) => item.id === id);
    carrito[pos].cantidad += 1;
  } else {
    const moto = buscarMoto(id);
    moto.cantidad = 1;
    carrito.push(moto);
  } //Agrega una mas al carrito de esa moto o agrega la primera vez de esa moto

  guardarMotosCarrito(carrito);
  renderBotonCarrito();
} //Agrega las motos al carrito

function eliminarMoto(id) {
  const carrito = cargarMotosCarrito();
  const motos = carrito.filter((item) => item.id !== id);
  guardarMotosCarrito(motos);
  renderMotosCarrito();
  renderBotonCarrito();
}//Elimina motos cargadas al carrito y lo actualiza

function buscarMoto(id) {
  const motos = cargarMotosLS();
  return motos.find((item) => item.id === id);
}

function totalMotosCarrito() {
  const motos = cargarMotosCarrito();
  return motos.reduce((total, item) => (total += item.cantidad), 0);
}

function totalPagarCarrito() {
  const motos = cargarMotosCarrito();
  return motos.reduce(
    (total, item) => (total += item.cantidad * item.precio),
    0
  );
} //Calcula el total a pagar

function renderBotonCarrito() {
  document.getElementById("carrito").innerText = totalMotosCarrito();
}

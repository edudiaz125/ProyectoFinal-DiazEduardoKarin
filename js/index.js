//Gif de "loading..."
const loadingElement = document.getElementById("loading");
const contentElement = document.getElementById("content");
const loadingPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});
loadingPromise.then(() => {
  loadingElement.style.display = "none";
  contentElement.style.display = "block";
  renderMotos();
});

function guardarMotos() {
  fetch("./js/motos.json")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      localStorage.setItem("motos", JSON.stringify(datos));
    });
} //Guarda las motos que busca con el fetch al JSON

function cargarMotosLS() {
  return JSON.parse(localStorage.getItem("motos")) || [];
}

guardarMotos();

function renderMotos() {
  let salida = "";
  for (moto of cargarMotosLS()) {
    salida += `<div class="col-md-4 my-4">
            <div class="card text-center border-0">
                <img src="${"images/" + moto.imagen}" alt="${
      moto.nombre
    }" class="card-img-top" />
                <div class="card-body">
                    <p class="card-text">${moto.marca} ${moto.modelo}</p>
                    <p class="card-text">Precio: $${moto.precio} </p>
                    <p><button class="btn btn-info" onclick="agregarAlCarrito(${
                      moto.id
                    }); motoAgregada()" title="Agregar Moto">Agregar</button>
                </div>
            </div>
        </div>`;
  }

  document.getElementById("motos").innerHTML = salida;
} //Renderiza las motos en los divs creados dinamicamente

function motoAgregada() {
  Toastify({
    text: "Moto agregada al carrito",

    duration: 1500,
  }).showToast();
} //Alert al clickear una moto para agregar al carrito

renderBotonCarrito();

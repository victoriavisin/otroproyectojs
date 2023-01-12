const stockProductos = [
    {
      id: 1,
      nombre: "GTA 5",
      cantidad: 1,
      desc: "Vive una vida en Vinewood",
      precio: 1200,
      img: "assets/imagen/gta5.jpg",
    },
    {
      id: 2,
      nombre: "God of War",
      cantidad: 1,
      desc: "Una historia con los mejores graficos",
      precio: 1500,
      img: "assets/imagen/gow.jpg",
    },
    {
      id: 3,
      nombre: "HALO",
      cantidad: 1,
      desc: "Si te gusta disparar no compres esto por tu bien",
      precio: 1570,
      img: "assets/imagen/halo.jpg",
    },
    
    {
      id: 4,
      nombre: "Call Of Duty Warzone",
      cantidad: 1,
      desc: "Dispara como nunca",
      precio: 1200,
      img: "assets/imagen/cod.jpg",
    },
    {
      id: 5,
      nombre: "FIFA 2023",
      cantidad: 1,
      desc: "Juego de futbol",
      precio: 1400,
      img: "assets/imagen/fifa23.jpg",
    },
  ];


  let carrito= [];

  const contenedor = document.querySelector ("#contenedor")
  const carritoContenedor = document.querySelector ("#carritoContenedor")
  const vaciarCarrito = document.querySelector ("#vaciarCarrito")
  const precioTotal = document.querySelector ("#precioTotal")
  const procesarCompra = document.querySelector("#procesarCompra");

  document.addEventListener ("DOMContentLoaded" , () => {
    carrito =JSON.parce (localStorage.getItem ("carrito")) || []
  })








   // AGREGO MIS PRODUCTOS AL HTML
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-3" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });

  function agregarProducto(id){

    const existe = carrito.some((prod) => prod.id === id)

    if(existe) {
        const prod = carrito.map (prod => {
            if(prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item =stockProductos.find((prod) => prod.id === id)
        carrito.push(item)

    }

    mostrarCarrito()

  }

  const mostrarCarrito = () => {
    const modalBody = document.querySelector (".modal-body")

    modalBody.innerHTML = " "
    
    carrito.forEach ((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
        `;
    })


if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Tu carrito esta vacio!</p>
    `;
  } else {
    console.log("Algo");
  }

    carritoContenedor.textContent = carrito.length;

    precioTotal.innerText = carrito.reduce ((acc, prod) => acc + prod.cantidad * prod.precio, 0)


    guardarStorage ()

  }
  

  function eliminarProducto(id) {
    const producId = id;
    carrito = carrito.filter((produc) => produc.id !== producId);
    mostrarCarrito();
  }

  vaciarCarrito.addEventListener ("click", () => {
    carrito.length = []
    mostrarCarrito ();
  })

function guardarStorage () {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
            title: "¡Compra Realizada!",
            text: "Muchas gracias por su compra",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
      }
    });
  }
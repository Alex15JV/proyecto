var carrito = []

function agregarProductosCarrito(categoriaId, productoID) {
    var nombreProductos = document.getElementById('ficha-tecnica-' + categoriaId + '-' + productoID).querySelector('td:nth-child(2)').textContent;
    var CantidadProducto = parseInt(document.getElementById('Cantidadproducto-' + categoriaId + '-' + productoID).value);
    var precioProducto = parseInt(document.getElementById('ficha-tecnica-' + categoriaId + '-' + productoID).getAttribute('data-precio'));
    var producto = {
        nombre: nombreProductos, 
        cantidad: CantidadProducto,
        precio: precioProducto
    };

    carrito.push(producto)

    var badgeCarrito = document.querySelector('.badge');
    badgeCarrito.textContent = carrito.length;

    alert("Producto agregado al carrito con exito. " + nombreProductos)
}

function abrirCarrito() {
    var modal = document.getElementById("carritoModal");
    modal.style.display = "block";

    var listaDeProductos = document.getElementById("listaDeProductos");
    listaDeProductos.innerHTML = "";
    var total = 0;
    
    carrito.forEach(function(producto, index){
        var item = document.createElement("li");
        item.textContent = producto.nombre + " - cantidad: " + producto.cantidad + " - precio: $" + producto.precio;
        listaDeProductos.appendChild(item);
        total += producto.cantidad * producto.precio;

        var Eliminar = document.createElement("button");
        Eliminar.textContent = "x";
        Eliminar.classList.add("btn", "btn-sm", "ms-2", "btn-cerrar");
        Eliminar.onclick = function(){
            EliminarProducto(index);
        };
        item.appendChild(Eliminar);
        listaDeProductos.appendChild(item);
    })

    var totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.textContent = "$" + total.toFixed(2);

    var badgeCarrito = document.querySelector('.badge');
    badgeCarrito.textContent = carrito.length;
}

function abrirLogin() {
    var modal = document.getElementById("login");
    modal.style.display = "block";
}

function EliminarProducto(index) {
    carrito.splice(index, 1);
    abrirCarrito();
}
  

function cerrarCarrito() {
    var modal = document.getElementById("carritoModal");
    modal.style.display = "none";
}



function abrirFichaTecnica(categoriaId, producto){
    var fichaTecnica = document.getElementById("ficha-tecnica-" + categoriaId + '-' + producto)
    if (fichaTecnica){
        if (fichaTecnica.style.display === "none"){
            fichaTecnica.style.display = "block";
        } else {
            fichaTecnica.style.display = "none";
        }
        
    }  
}
function cerrar(categoriaId, producto) {
    var fichaTecnica = document.getElementById("ficha-tecnica-" + categoriaId + '-' + producto)
    if (fichaTecnica){
        if (fichaTecnica.style.display === "block"){
            fichaTecnica.style.display = "none";
        } else {
            fichaTecnica.style.display = "block";
        }
    }
}
function Sumar(categoriaId, producto) {
    var CantidadInput = document.getElementById('Cantidadproducto-' + categoriaId + '-' + producto);
    var Cantidad = parseInt(CantidadInput.value);
    Cantidad++;
    CantidadInput.value = Cantidad;

    var precioProducto = parseInt(document.getElementById("ficha-tecnica-" + categoriaId + '-' + producto).getAttribute("data-precio"));
    ActualizarPrecio(precioProducto, Cantidad, 'precioS' + producto.charAt(producto.length - 1));
}
function Restar(categoriaId, producto) {
    var CantidadInput = document.getElementById('Cantidadproducto-' + categoriaId + '-' + producto);
    var Cantidad = parseInt(CantidadInput.value);
    if (Cantidad > 1){
        Cantidad--;
        CantidadInput.value = Cantidad;

        var precioProducto = parseInt(document.getElementById("ficha-tecnica-" + categoriaId + '-' + producto).getAttribute("data-precio"));
        ActualizarPrecio(-precioProducto, Cantidad, 'precioS' + producto.charAt(producto.length - 1));
    }
}
function ActualizarPrecio(cambioPrecio, cantidad,IDPrecio){
    var precioTotalInput = document.getElementById(IDPrecio);
    if (precioTotalInput){
        var precioTotal = parseInt(precioTotalInput.value);
        precioTotal += cambioPrecio;
        precioTotalInput.value = precioTotal;
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    var togglerButtons = document.querySelectorAll('.navbar-toggler');

    togglerButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var target = this.getAttribute('data-bs-target');
            var collapse = document.querySelector(target);

            if (collapse.classList.contains('show')) {
                collapse.classList.remove('show');
            } else {
                collapse.classList.add('show');
            }
        });
    });
});

document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault();

    var DatosFormulario = new FormData(this);
    var SL = new XMLHttpRequest();
    SL.open('POST', 'https://astucious-latch.000webhostapp.com/enviar.php', true);
    SL.onreadystatechange = function(){
        if (SL.readyState === XMLHttpRequest.DONE){
            if (SL.status === 200){
                alert(SL.responseText);

                document.getElementById('formularioContacto').reset();
            }else{
                alert('error al enviar el formulario. Por favor intentelo de nuevo')
            }
        }
    };
    SL.send(DatosFormulario);
});

document.getElementById('BTbuscar').addEventListener('click', function() {
    var BTbuscar = document.getElementById('BTbuscar').value.toLowerCase();
    var Contenido = document.querySelectorAll('.contenido');
    var Resultados = document.getElementById('resultados');
  
    Resultados.innerHTML = '';
  
    Contenido.forEach(function(content) {
      var titulo = content.querySelector('h2').textContent.toLowerCase();
      var Descripcion = content.querySelector('p').textContent.toLowerCase();
  
      if (titulo.includes(BTbuscar) || Descripcion.includes(BTbuscar)) {
        var item = document.createElement('div');
        item.innerHTML = '<h2>' + titulo + '</h2><p>' + Descripcion + '</p>';
        Resultados.appendChild(item);
      }
    });
  });

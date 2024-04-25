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

    carrito.push(producto);
    actualizarC();

    var badgeCarrito = document.querySelector('.badge');
    badgeCarrito.textContent = carrito.length;

    alert("Producto agregado al carrito con exito. " + nombreProductos)
}
function actualizarC() {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

function GuardarP() {
    if (sessionStorage.getItem('carrito')) {
        carrito = JSON.parse(sessionStorage.getItem('carrito'));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    GuardarP();
});

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
    actualizarC();
    
    abrirCarrito();
}
  
function cerrarCarrito() {
    var modal = document.getElementById("carritoModal");
    modal.style.display = "none";
}

function cerrarRegistro() {
    var modal = document.getElementById("login");
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

//evita redireccion en el formulario de contacto
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

document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío tradicional del formulario

    var formData = new FormData(this);
    fetch('https://astucious-latch.000webhostapp.com/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Almacenar el usuario en el almacenamiento local o cookies
            localStorage.setItem('Usuario', data.Usuario);
            // Actualizar la UI
            document.getElementById('NombreUsuario').textContent = 'Bienvenido, ' + data.Usuario;
            // Redirigir a otra página o actualizar la página actual
        } else {
            alert(data.error); // Mostrar error
        }
    })
    .catch(error => console.error('Error:', error));
});

//Realizar pedidos
function realizarPedido() {
    var productos = document.getElementById('listaDeProductos').innerText;
    var total = document.getElementById('totalCarrito').innerText;

    
    var formData = new FormData();
    formData.append('productos', productos);
    formData.append('total', total);

    fetch('https://astucious-latch.000webhostapp.com/enviar_pedido.php', {
        method: 'POST',
        body: formData 
    })
    .then(response => response.text()) 
    .then(data => {
        console.log('Success:', data);
        // Limpiar el carrito
        document.getElementById('listaDeProductos').innerHTML = '';
        document.getElementById('totalCarrito').innerText = '0';
        // Mostrar mensaje al usuario
        alert('El pedido fue realizado con exito, puede pasar por nuestras instalaciones a efectuar el pago y retirar su pedido. Gracias por su compra!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

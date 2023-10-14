
// Función para aplicar el filtro
function applyFilter(category) {
    const productos = document.querySelectorAll('.producto');

    productos.forEach(function(producto) {
        if (category === 'todos' || producto.getAttribute('data-category') === category) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Función para guardar la categoría seleccionada en localStorage
function saveCategoryToStorage(category) {
    localStorage.setItem('selectedCategory', category);
}

// Función para cargar la categoría seleccionada de localStorage
function loadCategoryFromStorage() {
    return localStorage.getItem('selectedCategory') || 'todos';
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar la categoría seleccionada al cargar la página
    const selectedCategory = loadCategoryFromStorage();
    applyFilter(selectedCategory);

    // Agregar un evento click a los botones de filtro
    document.querySelectorAll('.filtro').forEach(function(button) {
        button.addEventListener('click', function() {
            const category = button.getAttribute('data-category');
            applyFilter(category);

            // Guardar la categoría seleccionada en localStorage
            saveCategoryToStorage(category);
        });
    });
});

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Recuperar el carrito actual del almacenamiento local
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el nuevo producto al carrito
    carritoActual.push({ nombre, precio });

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
}

// Función para mostrar los productos en el carrito en la página del carrito.html
function mostrarProductosEnCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ''; // Limpia la lista antes de actualizarla

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoActual.forEach((producto) => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerText = `${producto.nombre} - Precio: $${producto.precio}`;
        carritoLista.appendChild(itemCarrito);
    });
}

// Agregar evento de clic a los botones "Agregar al Carrito"
document.querySelectorAll('.boton-carrito').forEach((boton) => {
    boton.addEventListener('click', () => {
        const nombreProducto = boton.getAttribute('data-nombre');
        const precioProducto = parseFloat(boton.getAttribute('data-precio'));
        agregarAlCarrito(nombreProducto, precioProducto);
        alert('Producto agregado al carrito.');
    });
});

// Función para limpiar el carrito (elimina el último producto)
function limpiarCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carritoActual.length > 0) {
        carritoActual.pop(); // Elimina el último producto del carrito
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        mostrarProductosEnCarrito(); // Actualiza la vista del carrito
    } else {
        alert('El carrito está vacío.');
    }
}


// Función para vaciar el carrito (eliminar todos los productos)
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
    mostrarProductosEnCarrito(); // Actualiza la vista del carrito
}

// Agregar evento de clic al botón "Limpiar Carrito"
document.getElementById('limpiar-carrito').addEventListener('click', () => {
    limpiarCarrito();
});

// Agregar evento de clic al botón "Vaciar Carrito"
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    vaciarCarrito();
});

// Función para eliminar un producto del carrito por su índice
function eliminarProductoDelCarrito(index) {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Elimina el producto en el índice especificado
    carritoActual.splice(index, 1);
    
    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    
    mostrarProductosEnCarrito(); // Actualiza la vista del carrito
}

// Llama a la función para mostrar los productos en el carrito al cargar la página del carrito.html
mostrarProductosEnCarrito();


// Función para calcular el total de precios en el carrito
function calcularTotal() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    carritoActual.forEach((producto) => {
        // Redondear el precio a 2 decimales antes de sumarlo
        total += parseFloat(producto.precio.toFixed(2));
    });

    return total.toFixed(2); // Redondear el total a 2 decimales
}

// ...

// Agregar evento de clic al botón "Comprar"
document.getElementById('comprar').addEventListener('click', () => {
    const total = calcularTotal();

    if (total > 0) {
        vaciarCarrito(); // Vacía el carrito en lugar de limpiarlo
        alert(`Gracias por su compra. El total es: $${total}. El pedido se está preparando.`);
    } else {
        alert('El carrito está vacío. Agregue productos antes de comprar.');
    }
});






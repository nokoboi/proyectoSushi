const api_product = 'http://localhost/ProyectoSushi/controllers/Productos.php';

// Obtener el parámetro 'mesa' de la URL
const urlParams = new URLSearchParams(window.location.search);
const numeroMesa = urlParams.get('mesa');
const numPersonas = urlParams.get('personas');

console.log(numeroMesa); // Esto mostrará '5' en la consola
console.log('Personas: ', numPersonas);

// Array para almacenar los productos seleccionados en el carrito
const carrito = [];

// Función para obtener productos de la API y mostrar en el contenedor
async function fetchProducts() {
    try {
        const response = await fetch(api_product);
        const productos = await response.json();
        const productContainer = document.querySelector('.product-container');

        // Limpiar el contenedor antes de agregar productos
        productContainer.innerHTML = '';

        // Separar productos en dos listas
        const productosComida = [];
        const productosBebida = [];

        productos.forEach(producto => {
            // Quitar los "../" de la ruta de la imagen
            const imagenUrl = producto.imagen.replace(/\.\.\//g, '');

            // Crear el contenido del producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            productoDiv.innerHTML = `
                <img src="${imagenUrl}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                ${producto.precio && producto.precio !== '0.00' ? `<p>Precio: ${producto.precio} €</p>` : ''}
            `;

            // Agregar el evento de clic para añadir al carrito al hacer clic en el producto
            productoDiv.addEventListener('click', () => {
                agregarAlCarrito(producto.id, producto.nombre, producto.precio);
            });

            // Agregar el producto a la lista correspondiente
            if (producto.tipo === 'bebida') {
                productosBebida.push(productoDiv);
            } else {
                productosComida.push(productoDiv);
            }

            // Añadir el producto al contenedor
            productContainer.appendChild(productoDiv);
        });

        // Agregar primero los productos de comida y luego los de bebida
        productosComida.forEach(div => productContainer.appendChild(div));
        productosBebida.forEach(div => productContainer.appendChild(div));

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no está, agregarlo al carrito
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    mostrarCarrito();
}

// Función para mostrar el carrito
// Función para mostrar el carrito
function mostrarCarrito() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar contenido anterior

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        
        // Verificar si el precio es 0.0 y ajustar la visualización
        if (item.precio === '0.0') {
            itemDiv.innerHTML = `${item.nombre} - Cantidad: ${item.cantidad}`;
        } else {
            itemDiv.innerHTML = `${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}`;
        }

        cartItemsContainer.appendChild(itemDiv);
    });
}


// Evento para confirmar el pedido
document.getElementById('confirmarPedido').addEventListener('click', () => {
    // Aquí puedes agregar la lógica para confirmar el pedido
    console.log('Pedido confirmado:', carrito);
});

// Llamar a la función para cargar los productos al cargar la página
fetchProducts();

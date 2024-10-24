const API_URL = 'http://localhost/ProyectoSushi/controllers/Productos.php';
const errorElement = document.getElementById('createError');

function limpiarHTML(str) {
    return str.replace(/[^\w.@-]/gi, function (e) {
        return '&#' + e.charCodeAt(0) + ';';
    });
}

function validarProd(producto) {
    return producto.length >= 2 && producto.length <= 50;
}

function getProductos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(productos => {
            const tableBody = document.querySelector('#prodTable tbody')
            tableBody.innerHTML = '';

            productos.forEach(prod => {
                const sanitizedProd = limpiarHTML(prod.nombre)
                const sanitizedDesc = limpiarHTML(prod.descripcion) ? prod.descripcion : 'No tiene descripción';
                const precio = prod.precio ? prod.precio : 0.0

                tableBody.innerHTML += `
                <tr data-id="${prod.id}">
                    <td>${prod.id}</td>
                    <td>
                        <span class="listado">${sanitizedProd}</span>
                        <input class="edicion" type="text" value="${sanitizedProd}">
                    </td>
                    <td>
                        <span class="listado">${sanitizedDesc}</span>
                        <textarea class="edicion" id="descripcion">${sanitizedDesc}</textarea>
                    </td>
                    <td>
                        <span class="listado">${prod.tipo}</span>
                        <select name="tipos" class="edicion">
                            <option value="buffet">Buffet</option>
                            <option value="bebida">Bebida</option>
                        </select>
                    </td>
                    <td>
                        <span class="listado">${precio}</span>
                        <input class="edicion" type="text" value="${precio}">
                        
                    </td>
                    <td>
                        <span class="listado">${prod.imagen}</span>
                    </td>
                    <td class="td-btn">
                        <button class="listado" onclick="editMode(${prod.id})">✏️</button>
                        <button class="listado" onclick="deleteUser(${prod.id})">🗑️</button>
                        <button class="edicion" onclick="updateUser(${prod.id})">✅</button>
                        <button class="edicion" onclick="cancelEdit(${prod.id})">❌</button>
                    </td>
                </tr>
            `
            });
        })
        .catch(error => console.log('Error: ', error));
}


function editMode(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'inline-block';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'none';
    })
}
function cancelEdit(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'none';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'inline-block';
    })
}
getProductos()

const API_URL = 'http://localhost/ProyectoSushi/controllers/Pedidos.php';

function limpiarHTML(str) {
    return str.replace(/[^\w.@-]/gi, function (e) {
        return '&#' + e.charCodeAt(0) + ';';
    });
}

function getPedidos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(pedidos => {
            renderPedidos(pedidos);
        })
        .catch(error => console.log('Error: ', error));
}

function renderPedidos(pedidos) {
    const tableBody = document.querySelector('#prodTable tbody');
    tableBody.innerHTML = '';

    pedidos.forEach(ped => {
        const sanitizedMesa = ped.mesa_id;
        const sanitizedPersona = ped.n_personas;
        const fecha = ped.fecha;

        tableBody.innerHTML += `
        <tr data-id="${ped.id}">
            <td>${ped.id}</td>
            <td>
                <span class="listado">${sanitizedMesa}</span>
                <input class="edicion" type="text" value="${sanitizedMesa}">
            </td>
            <td>
                <span class="listado">${sanitizedPersona}</span>
                <input class="edicion" type="text" value="${sanitizedPersona}">
            </td>
            <td>
                <span class="listado">${fecha}</span>
                <input class="edicion" type="date" value="${fecha}">
            </td>
            <td class="td-btn">
                <button class="listado" onclick="editMode(${ped.id})">✏️</button>
                <button class="listado" onclick="deletePed(${ped.id})">🗑️</button>
                <button class="edicion" onclick="updatePed(${ped.id})">✅</button>
                <button class="edicion" onclick="cancelEdit(${ped.id})">❌</button>
            </td>
        </tr>
        `;
    });
}

function updatePed(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newMesa = row.querySelector('td:nth-child(2) input').value.trim();
    const newPersona = row.querySelector('td:nth-child(3) input').value.trim();
    const newFecha = row.querySelector('td:nth-child(4) input').value.trim();

    const formData = new FormData();
    formData.append('mesa_id', newMesa);
    formData.append('n_personas', newPersona);
    formData.append('fecha',newFecha);

    fetch(`${API_URL}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        console.log('Pedido actualizado', result);
        getPedidos();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el pedido. Por favor, inténtelo de nuevo.');
    });
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

document.getElementById('filtro').addEventListener('click', filterPedidosByDateRange);

// Nueva función para filtrar por fecha
function filterPedidosByDateRange() {
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;

    // Si ambas fechas están presentes, aplica el filtro
    if (startDate && endDate) {
        fetch(API_URL)
            .then(response => response.json())
            .then(pedidos => {
                const filteredPedidos = pedidos.filter(ped => {
                    const pedidoFecha = new Date(ped.fecha);
                    return pedidoFecha >= new Date(startDate) && pedidoFecha <= new Date(endDate);
                });
                renderPedidos(filteredPedidos);
            })
            .catch(error => console.log('Error: ', error));
    } else {
        // Si alguna de las fechas no está establecida, carga todos los pedidos
        getPedidos();
    }
}

document.getElementById('borrarFiltro').addEventListener('click', clearDateFilter);

function clearDateFilter() {
    document.querySelector('#startDate').value = ''; // Limpiar la fecha de inicio
    document.querySelector('#endDate').value = ''; // Limpiar la fecha de fin
    getPedidos(); // Cargar todos los pedidos
}

getPedidos();

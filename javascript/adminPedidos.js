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
            const tableBody = document.querySelector('#prodTable tbody')
            tableBody.innerHTML = '';

            pedidos.forEach(ped => {
                const sanitizedMesa = ped.mesa_id
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

getPedidos();

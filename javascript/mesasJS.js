const API_MESAS = 'http://localhost/ProyectoSushi/controllers/Mesas.php';

const gridMesas = document.getElementById('gridMesas');
const mesaSeleccionadaDiv = document.getElementById('mesaSeleccionada');
const botonMenu = document.getElementById('botonMenu');
let mesaSeleccionadaNumero = null;

async function cargarMesas() {
    try {
        const response = await fetch(API_MESAS);
        const mesas = await response.json();

        gridMesas.innerHTML = '';

        mesas.forEach(mesa => {
            const divMesa = document.createElement('div');
            divMesa.className = 'mesa';
            divMesa.innerHTML = `Mesa ${mesa.numero_mesa}`;
            divMesa.addEventListener('click', () => seleccionarMesa(mesa.numero_mesa));
            gridMesas.appendChild(divMesa);
        })
    }catch(error){
        console.error('Error al cargar las mesas',error)
    }
}

function seleccionarMesa(numeroMesa) {
    const mesas = document.querySelectorAll('.mesa');
    mesas.forEach(mesa => mesa.classList.remove('seleccionada'));

    const mesaSeleccionada = document.querySelector(`.mesa:nth-child(${numeroMesa})`);
    mesaSeleccionada.classList.add('seleccionada');

    mesaSeleccionadaDiv.innerHTML = `¡Ñam! Has elegido la Mesa ${numeroMesa} 🎉`;
    mesaSeleccionadaNumero = numeroMesa;

    botonMenu.style.display = 'inline-block';
}

function irAlMenu() {
    if (mesaSeleccionadaNumero) {
        // Aquí puedes redirigir a la página del menú
        // Por ahora, solo mostraremos una alerta
        alert(`Yendo al menú para la Mesa ${mesaSeleccionadaNumero}. ¡A disfrutar del sushi! 🍣`);
        // En un caso real, usarías algo como:
        // window.location.href = `menu.html?mesa=${mesaSeleccionadaNumero}`;
    }
}

// Menú burger
function irAlMenu() {
    if (mesaSeleccionadaNumero) {
        alert(`Yendo al menú para la Mesa ${mesaSeleccionadaNumero}. ¡A disfrutar del sushi! 🍣`);
        // En un caso real, usarías:
        // window.location.href = `menu.html?mesa=${mesaSeleccionadaNumero}`;
    }
}

function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Cargamos las mesas cuando ya se haga cargado la pagina
document.addEventListener('DOMContentLoaded', cargarMesas);
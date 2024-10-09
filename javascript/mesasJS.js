const gridMesas = document.getElementById('gridMesas');
const mesaSeleccionadaDiv = document.getElementById('mesaSeleccionada');
const botonMenu = document.getElementById('botonMenu');
const numMesas = 12;
let mesaSeleccionadaNumero = null;

for (let i = 1; i <= numMesas; i++) {
    const mesa = document.createElement('div');
    mesa.className = 'mesa';
    mesa.innerHTML = `Mesa ${i}`;
    mesa.addEventListener('click', () => seleccionarMesa(i));
    gridMesas.appendChild(mesa);
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

const btnAdmin = document.getElementById('btnAdmin');

function validateLoginForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';

    let isValid = true;

    // Validar nombre de usuario
    if (username === '') {
        errorMessages.innerHTML += 'El nombre de usuario es obligatorio.<br>';
        isValid = false;
    } else if (username.length < 3) {
        errorMessages.innerHTML += 'El nombre de usuario debe tener al menos 3 caracteres.<br>';
        isValid = false;
    }

    // Validar contraseña
    if (password === '') {
        errorMessages.innerHTML += 'La contraseña es obligatoria.<br>';
        isValid = false;
    } else if (password.length < 5) {
        errorMessages.innerHTML += 'La contraseña debe tener al menos 5 caracteres.<br>';
        isValid = false;
    }

    return isValid;
}

btnAdmin.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de inmediato

    // Validar el formulario al hacer clic
    if (validateLoginForm()) {
        console.log("Formulario validado correctamente.");
        // Aquí puedes proceder con el envío del formulario o la acción deseada
    } else {
        console.log("El formulario tiene errores.");
    }
});

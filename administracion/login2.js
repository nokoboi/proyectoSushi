const formulario = document.getElementById('loginAdminForm');

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    // Es para para codificar una parte de una URL, asegurando que caracteres especiales no interfieran con la estructura de la URL
    const inputname = encodeURIComponent(document.getElementById('username').value);
    const inputpassword = encodeURIComponent(document.getElementById('password').value);  
    
    console.log(inputname)
    console.log(inputpassword)

    // Mandar datos a php
    fetch('login.php',{
        method: 'POST',
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        },
        body: `username=${inputname}&password=${inputpassword}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            window.location.href = `adminProductos.php`;
        }else{
            alert('Inicio de sesión fallido, por favor inténtalo otra vez');
        }
    })
    .catch(error =>{
        console.error('Error: '+error)
        alert('Ups, algo anda mal. Inténtalo de nuevo más tarde');
    });


});
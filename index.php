<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SUHO sushi</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="assets/suhologo.png" type="image/x-icon">
</head>

<body>
    <div class="logo">
        <img src="assets/suhologo.png" alt="logo del restaurante suho">
    </div>
    <h1>Bienvenido a Suho Sushi</h1>

    <div class="container">
        <h2>🍱 Elige tu mesa primero 🍱</h2>
        <div class="grid" id="gridMesas"></div>
        <div id="mesaSeleccionada"></div>
        <button id="botonMenu" onclick="irAlMenu()">Ver Menú 🍣</button>
    </div>

    <script src="javascript/mesasJS.js"></script>
</body>

</html>
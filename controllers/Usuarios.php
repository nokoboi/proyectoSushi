<?php
require_once '../data/usuario.php';
require_once 'utilidades.php';

header('Content-Type: application/json');

$usuario = new Usuario();

/**
 * La variable superglobal $_SERVER['REQUEST_METHOD'] contiene información sobre el método de solicitud HTTP realizado
 * REQUEST_METHOD :
 * -   GET     Para solicitar datos del servidor
 * -   POST    Para enviar datos al  servidor
 * -   PUT     Para actualizar datos existentes
 * -   DELETE  Para eliminar
 */
//obtener el método de la petición (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Obtener la URI de la petición
$uri = $_SERVER['REQUEST_URI'];

//obtener los parámetros de la petición
$parametros = Utilidades::parseUriParameters($uri);

//obtener el parámetro id
$id = Utilidades::getParameterValue($parametros, 'id');

switch ($method) {
    case 'GET':
        $respuesta = getAllUsuarios($usuario);

        echo json_encode($respuesta);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}

function getAllUsuarios($usuario){
    return $usuario->getAll();
}
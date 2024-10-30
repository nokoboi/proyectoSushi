<?php

require_once '../data/Pedido.php';
require_once 'utilidades.php';

header('Content-Type: application/json');

$pedido = new Pedido();

$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$parametros = Utilidades::parseUriParameters($uri);

$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, 'metodo');

switch ($method) {
    case 'GET':
        if ($id) {
            $respuesta = getPedidoById($pedido, $id);
        } else {
            $respuesta = getAllPedidos($pedido);
        }
        echo json_encode($respuesta);
        break;
    case 'POST':
        if ($metodo == 'nuevo') {
            setPedido($pedido);
        }
        if ($metodo == 'actualizar') {
            if ($id) {
                updatePedido($pedido, $id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID no proporcionado']);
            }
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}

function getAllPedidos($pedido)
{
    return $pedido->getAllPedidos();
}

function getPedidoById($pedido, $id)
{
    return $pedido->getPedidoById($id);
}


function setPedido($pedido){
    $data = json_decode(file_get_contents('php://input'), true);

    if(isset($data['mesa_id']) && isset($data['n_personas']) && isset($data['fecha'])){
        $id = $pedido->createPedido($data['mesa_id'],$data['n_personas'],$data['fecha']);
        echo json_encode(['id' => $id]);
    }else{
        echo json_encode(['Error' => 'Datos insuficientes']);
    }
}

function updatePedido($pedido, $id)
{
    $data = $_POST;

    if(isset($data['mesa_id']) && isset($data['n_personas']) && isset($data['fecha'])){
        $affected = $pedido->updatePedido($id, $data['mesa_id'],$data['n_personas'],$data['fecha']);
        echo json_encode(['affected' => $affected]);
    } else {
        echo json_encode(['Error' => 'Datos insuficientes']);
    }
}
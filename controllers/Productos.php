<?php

require_once '../data/Producto.php';
require_once 'utilidades.php';

header('Content-Type: application/json');

$products = new Producto();

$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$parametros = Utilidades::parseUriParameters($uri);

$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, 'metodo');


switch ($method) {
    case 'GET':
        if ($id) {
            $respuesta = getProductoById($products, $id);
        } else {
            $respuesta = getAllProducts($products);
        }
        echo json_encode($respuesta);
        break;
    case 'POST':
        if ($metodo == 'nuevo') {
            setProducto($products);
        }
        if ($metodo == 'actualizar') {
            if ($id) {
                updateProducto($products, $id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID no proporcionado']);
            }
        }
        if ($metodo == 'eliminar') {
            if ($id) {
                deleteProducto($products, $id);
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


function getAllProducts($products)
{
    return $products->getAllProducts();
}

function getProductoById($products, $id)
{
    return $products->getProductById($id);
}

function setProducto($producto)
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['nombre']) && isset($data['tipo']) && isset($data['imagen'])) {
        // Usar fusión nula para establecer el precio como null si no está presente
        $descripcion = $data['descripcion'] ?? null;
        $precio = $data['precio'] ?? null;

        // Crear el producto pasando los valores necesarios
        $id = $producto->createProduct($data['nombre'], $descripcion, $data['tipo'], $precio, $data['imagen']);
        
        echo json_encode(['id' => $id]);
    } else {
        echo json_encode(['Error' => 'Datos insuficientes']);
    }
}

function updateProducto($producto,$id){
    $data = json_decode(file_get_contents('php://input'),true);

    if (isset($data['nombre']) && isset($data['tipo']) && isset($data['imagen'])) {
        // Usar fusión nula para establecer el precio como null si no está presente
        $descripcion = $data['descripcion'] ?? null;
        $precio = $data['precio'] ?? null;

        // Crear el producto pasando los valores necesarios
        $affected = $producto->updateProducto($id,$data['nombre'], $descripcion, $data['tipo'], $precio, $data['imagen']);
        
        echo json_encode(['affected' => $affected]);
    } else {
        echo json_encode(['Error' => 'Datos insuficientes']);
    }
}

function deleteProducto($producto,$id){
    $affected = $producto->deleteProducto($id);
    echo json_encode(['affected' => $affected]);
}


// Consulta que muestre la factura o ticket
// modificar y ver los pedidos
// un filtro de fechas de los pedidos y consulta para mostrar el total del pedido


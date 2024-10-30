<?php

require_once 'Database.php';
require_once 'validator.php';

class DetallePedido
{
    private Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getAllDetalles()
    {
        $result = $this->db->query("SELECT * from detalle_pedidos");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDetalleById($id)
    {
        $result = $this->db->query("SELECT * from detalle_pedidos where id=?", [$id]);
        return $result->fetch_assoc();
    }

    public function createDetallePedido($pedidoID, $productoID, $cantidad)
    {
        // Obtener la cantidad de personas del pedido
        $pedidoResult = $this->db->query("SELECT n_personas FROM pedidos WHERE id = ?", [$pedidoID]);
        $pedido = $pedidoResult->fetch_assoc();
        $numPersonas = $pedido['n_personas'];

        // Obtener el precio del buffet por persona desde la tabla miscelaneo
        $buffetResult = $this->db->query("SELECT precio FROM miscelaneo WHERE concepto = 'buffet'");
        $buffet = $buffetResult->fetch_assoc();
        $precioBuffet = $buffet['precio'];

        // Obtener el precio del producto que se añade al detalle del pedido
        $productoResult = $this->db->query("SELECT precio FROM productos WHERE tipo='bebida' and id = ?", [$productoID]);
        $producto = $productoResult->fetch_assoc();
        $precioProducto = $producto['precio'] * $cantidad;

        // Calcular el total incluyendo el precio del buffet
        $total = $precioProducto + ($precioBuffet * $numPersonas);

        // Insertar el detalle del pedido en la base de datos
        $this->db->query(
            "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, total) VALUES (?, ?, ?, ?)",
            [$pedidoID, $productoID, $cantidad, $total]
        );

        return ['status' => 'success', 'message' => 'Detalle del pedido creado correctamente', 'total' => $total];
    }



}
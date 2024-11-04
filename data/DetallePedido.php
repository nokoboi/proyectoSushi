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

    public function createDetallePedido($pedidoId, $productoId, $cantidad)
    {
        // Validar si el pedido existe
        $pedido = $this->db->query("SELECT n_personas FROM pedidos WHERE id = ?", [$pedidoId])->fetch_assoc();

        if (!$pedido) {
            return ['Error' => 'Pedido no encontrado'];
        }

        // Obtener el precio del producto
        $producto = $this->db->query("SELECT precio FROM productos WHERE id = ?", [$productoId])->fetch_assoc();

        if (!$producto) {
            return ['Error' => 'Producto no encontrado'];
        }

        // Insertar el nuevo detalle de pedido
        $insert = $this->db->query(
            "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)",
            [$pedidoId, $productoId, $cantidad]
        );

        if ($insert) {
            return ['Éxito' => 'Detalle de pedido creado correctamente'];
        } else {
            return ['Error' => 'Error al crear el detalle de pedido'];
        }
    }

}
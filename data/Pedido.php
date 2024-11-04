<?php

require_once 'Database.php';
require_once 'validator.php';

class Pedido{
    private Database $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAllPedidos(){
        $result = $this->db->query("SELECT * from pedidos");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPedidoById($id)
    {
        $result = $this->db->query("SELECT * from pedidos where id=?", [$id]);
        return $result->fetch_assoc();
    }

    public function createPedido($mesaId, $personas, $fecha, $detalles) {
        $data = ['mesa_id' => $mesaId, 'n_personas' => $personas, 'fecha' => $fecha];
        $dataSaneado = Validator::sanear($data);
    
        $mesaIdSaneado = $dataSaneado['mesa_id'];
        $personaSaneada = $dataSaneado['n_personas'];
        $fechaSaneada = $dataSaneado['fecha'];
    
        // Paso 1: Insertar el pedido inicialmente sin total
        $this->db->query("INSERT INTO pedidos (mesa_id, n_personas, fecha, total) VALUES (?, ?, ?, 0)", [$mesaIdSaneado, $personaSaneada, $fechaSaneada]);
        $pedidoId = $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    
        if (!$pedidoId) {
            return ['Error' => 'No se pudo crear el pedido'];
        }
    
        // Paso 2: Insertar los detalles y calcular el total acumulado
        $totalProductos = 0;
        foreach ($detalles as $detalle) {
            $productoId = $detalle['producto_id'];
            $cantidad = $detalle['cantidad'];
    
            // Obtener el precio del producto
            $producto = $this->db->query("SELECT precio FROM productos WHERE id = ?", [$productoId])->fetch_assoc();
            
            if (!$producto) {
                return ['Error' => 'Producto no encontrado'];
            }
    
            $precioProducto = $producto['precio'];
            $subtotalProducto = $precioProducto * $cantidad;
            $totalProductos += $subtotalProducto;
    
            // Insertar el detalle de pedido
            $this->db->query(
                "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)",
                [$pedidoId, $productoId, $cantidad]
            );
        }
    
        // Paso 3: Calcular el total del buffet por persona
        $precioBuffet = $this->db->query("SELECT precio FROM miscelaneo WHERE concepto = 'buffet'")->fetch_assoc()['precio'];
        $totalBuffet = $precioBuffet * $personas;
    
        // Paso 4: Calcular el total final y actualizar el pedido
        $total = $totalProductos + $totalBuffet;
        $this->db->query("UPDATE pedidos SET total = ? WHERE id = ?", [$total, $pedidoId]);
    
        return ['Éxito' => 'Pedido creado correctamente', 'total' => $total];
    }
    
    
    

    public function updatePedido($id,$mesaId, $personas, $fecha){
        $data = ['mesa_id'=>$mesaId, 'n_personas'=>$personas, 'fecha'=>$fecha];
        $dataSaneado = Validator::sanear($data);

        $mesaIdSaneado=$dataSaneado['mesa_id'];
        $personaSaneada = $dataSaneado['n_personas'];
        $fechaSaneada = $dataSaneado['fecha'];

        $result = $this->db->query("SELECT id from pedidos where id=?",[$id]);
        if($result->num_rows == 0){
            return ['Pedido' => 'El pedido no existe'];
        }

        $this->db->query(
            "UPDATE pedidos set mesa_id=?, n_personas=?, fecha=? where id=?",
            [$mesaId,$personaSaneada,$fechaSaneada,$id]
        );

        return $this->db->query("SELECT ROW_COUNT() as affected")->fetch_assoc()['affected'];
    }
    
}
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

    public function createPedido($mesaId, $personas, $fecha){
        $data = ['mesa_id'=>$mesaId, 'n_personas'=>$personas, 'fecha'=>$fecha];
        $dataSaneado = Validator::sanear($data);

        $mesaIdSaneado=$dataSaneado['mesa_id'];
        $personaSaneada = $dataSaneado['n_personas'];
        $fechaSaneada = $dataSaneado['fecha'];

        $this->db->query("INSERT into pedidos(mesa_id,n_personas,fecha) values(?,?,?)",
        [$mesaIdSaneado,$personaSaneada,$fechaSaneada]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc();
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
<?php
require_once 'Database.php';

class Usuario{
    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll(){
        $result = $this->db->query("SELECT * FROM usuarios;");
        return $result->fetch_all(MYSQLI_ASSOC);    
    }
}
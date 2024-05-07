<?php
// Configuración de la conexión a la base de datos
$host = 'localhost'; // Cambia esto al host de tu base de datos
$dbname = 'c2031211_cjchica'; // Cambia esto al nombre de tu base de datos
$username = 'c2031211_system'; // Cambia esto al nombre de usuario de tu base de datos
$password = 'Dimicgi1006'; // Cambia esto a la contraseña de tu base de datos

// Intentar establecer la conexión
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configurar el modo de errores de PDO a excepciones
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Conexión exitosa";
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

// Verificar si se han recibido datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y procesar los datos del formulario
    $date = $_POST["date"];
    $amount = $_POST["amount"];
    $type = $_POST["type"];
    $reason = $_POST["reason"];
    $invoice = $_POST["invoice"];
    $plate = $_POST["plate"];
    $provider = $_POST["provider"];

    // Preparar la consulta SQL de inserción
    $sql = "INSERT INTO transacciones (fecha, monto, tipo, razon, factura, placa, proveedor)
            VALUES (:fecha, :monto, :tipo, :razon, :factura, :placa, :proveedor)";
    // Preparar la declaración SQL usando la conexión establecida
    $stmt = $conn->prepare($sql);
    // Vincular parámetros de la consulta con los valores recibidos del formulario
    $stmt->bindParam(':fecha', $date);
    $stmt->bindParam(':monto', $amount);
    $stmt->bindParam(':tipo', $type);
    $stmt->bindParam(':razon', $reason);
    $stmt->bindParam(':factura', $invoice);
    $stmt->bindParam(':placa', $plate);
    $stmt->bindParam(':proveedor', $provider);

    // Ejecutar la consulta
    try {
        $stmt->execute();
        echo "¡Datos insertados correctamente!";
    } catch(PDOException $e) {
        echo "Error al insertar datos: " . $e->getMessage();
    }
} else {
    // Si no se reciben datos POST, enviar un mensaje de error
    echo "Error: No se recibieron datos del formulario.";
}
?>

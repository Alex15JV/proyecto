<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
// Verifica si se han enviado datos del formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recupera y sanitiza los datos del formulario
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $telefono = filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_STRING);
    $mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);

    // Verifica si todos los campos requeridos están presentes
    if ($nombre && $email && $telefono && $mensaje) {
        // Configura el destinatario del correo electrónico
        $destinatario = "ferreteriasoniaylibrado7@gmail.com";

        // Asunto del correo electrónico
        $asunto = "Nuevo mensaje desde el sitio web";

        // Construye el cuerpo del mensaje
        $cuerpoMensaje = "nombre: $nombre\n";
        $cuerpoMensaje .= "correo electrónico: $email\n";
        $cuerpoMensaje .= "teléfono: $telefono\n\n";
        $cuerpoMensaje .= "mensaje:\n$mensaje";

        // Envía el correo electrónico
        if (mail($destinatario, $asunto, $cuerpoMensaje)) {
            echo "¡El mensaje se ha enviado correctamente!";
        } else {
            echo "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
        }
    } else {
        echo "Error: Todos los campos son requeridos y deben contener datos válidos.";
    }
} else {
    // Si no se ha enviado un formulario POST, muestra un mensaje de error
    echo "Error: No se han recibido datos del formulario.";
}
?>
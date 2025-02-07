<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $service = htmlspecialchars($_POST["service"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "vinonfs@gmail.com";
    $subject = "New Enquiry from " . $name;
    
    $body = "You have received a new enquiry.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Service Requested: $service\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Invalid Request";
}
?>

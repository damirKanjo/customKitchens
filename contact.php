<?php
if (!empty($_POST["website"])) {
    die("Spam detected.");
}

if (
    empty($_POST["name"]) || 
    empty($_POST["lastname"]) ||
    empty($_POST["email"]) || 
    empty($_POST["message"])
) {
    die("All fields are required.");
}

$name = htmlspecialchars(trim($_POST["name"]));
$lastname = htmlspecialchars(trim($_POST["lastname"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST["message"]));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

$to = "damirkanjo@gmail.com"; 
$subject = "Nova poruka sa kontakt forme";
$body = "Ime: $name $lastname\nEmail: $email\n\nPoruka:\n$message";

$headers  = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "error";
}
?>

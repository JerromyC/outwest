<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "norwalldesign@gmail.com"; // Replace with your email address
    $subject = "New Form Submission from OutWest Landscaping";

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zipcode = $_POST['zipcode'];
    $services = implode(", ", $_POST['services'] ?? []);
    $comments = $_POST['additional-comments'];

    $message = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Address: $street, $city, $state $zipcode\n
        Services: $services\n
        Comments: $comments
    ";

    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you! Your request has been sent.";
    } else {
        echo "Oops! Something went wrong. Please try again.";
    }
}
?>

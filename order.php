<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $wishes = htmlspecialchars($_POST['wishes']);
    $package = htmlspecialchars($_POST['package']);
    $privacy = isset($_POST['privacy']) ? $_POST['privacy'] : null;

    // Отправка данных на почту (например, для уведомления)
    $to = "mukhtarovbilol@gmail.com";
    $subject = "Новый заказ на песню";
    $message = "Имя: $name\nТелефон: $phone\nПожелания: $wishes\nПакет: $package";
    mail($to, $subject, $message);

    // Перенаправление на WhatsApp
    $whatsappMessage = urlencode("Новый заказ!%0AИмя: $name%0AТелефон: $phone%0AПожелания: $wishes%0AПакет: $package");
    $whatsappURL = "https://api.whatsapp.com/send?phone=79221111193&text=$whatsappMessage";

    // Перенаправление пользователя на WhatsApp
    header("Location: $whatsappURL");
    exit();
}
?>
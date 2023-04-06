<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../../libraries/mail/PHPMailer/src/Exception.php';
require '../../libraries/mail/PHPMailer/src/PHPMailer.php';
require '../../libraries/mail/PHPMailer/src/SMTP.php';

function sendMail($mailTo, $subject, $body)
{

   // Instantiation and passing `true` enables exceptions
   $mail = new PHPMailer(true);

   try {
      $mail->CharSet = "UTF-8";

      //Server settings
      $mail->isSMTP(); // gửi mail SMTP
      $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
      $mail->SMTPAuth = true; // Enable SMTP authentication
      $mail->Username = 'sakurashopvn0304@gmail.com'; // SMTP username
      $mail->Password = 'vejlutzuqhexligg'; // SMTP password
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
      $mail->Port = 587; // TCP port to connect to

      //Recipients
      $mail->setFrom('sakurashopvn0304@gmail.com', 'Sakura Shop');
      $mail->addAddress($mailTo, 'Client'); // Add a recipient

      // Content
      $mail->isHTML(true);   // Set email format to HTML
      $mail->Subject = $subject;
      $mail->Body = "
         <div style='text-align: center;
            padding: 24px 18px;
            width: 100%;
            background-color: #62a403;
            color: white;
            font-size: 22px'
         >
            Organic-Food
         </div>
         <div style='padding: 24px 18px; font-size: 16px'>$body</div>
         <div style='color: #62a403 !important; text-align: center;'>
            Từ: sakurashopvn0304@gmail.com
         </div>
      ";

      $mail->send();
      return true;
   } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$e}";
      return false;
   }
}

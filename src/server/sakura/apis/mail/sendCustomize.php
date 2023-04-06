<?php
//? ====================
//? IMPORTS
//? ====================
require("../../core/config.php");
require("../../core/connectDatabase.php");
require("../../classes/ResponseAPI.php");
require("../../helpers/functions.php");
require("../../classes/mails/EmptyMail.php");


//? ====================
//? HEADERS
//? ====================
header("Access-Control-Allow-Origin: " . ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Headers: " . ACCESS_CONTROL_ALLOW_HEADERS);
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$data = getJSONPayloadRequest();

$mailTo = trim($data["mailTo"] ?? ""); // string
$subject = trim($data["subject"] ?? ""); // string
$body = trim($data["body"] ?? ""); // string


//? ====================
//? START
//? ====================
// ✅ Gửi mail tùy chỉnh
sendCustomizeMail($mailTo, $subject, $body);


//? ====================
//? FUNCTIONS
//? ====================
function sendCustomizeMail($mailTo, $subject, $body)
{
   // Kiểm tra dữ liệu payload
   if ($mailTo === "" || $subject === "" || $body === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra định dạng email
   if (!validateEmail($mailTo)) {
      $response = new ResponseAPI(3, "Không đúng định dạng email");
      $response->send();
      return;
   }

   // Tạo đối tượng gửi mail
   $mail = new EmptyMail($mailTo, $subject, $body);

   // Gửi email
   if ($mail->send()) {
      $response = new ResponseAPI(1, "Gửi mail thành công");
      $response->send();
   } else {
      $response = new ResponseAPI(4, "Gửi mail thất bại");
      $response->send();
   }
}

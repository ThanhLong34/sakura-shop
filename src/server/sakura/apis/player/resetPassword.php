<?php
//? ====================
//? IMPORTS
//? ====================
require("../../core/config.php");
require("../../core/connectDatabase.php");
require("../../helpers/functions.php");
require("../../classes/ResponseAPI.php");
require("../../classes/mails/ResetPasswordPlayerMail.php");

//? ====================
//? HEADERS
//? ====================
header("Access-Control-Allow-Origin: " . ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Headers: " . ACCESS_CONTROL_ALLOW_HEADERS);
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$tableName = "player";
$data = getJSONPayloadRequest();

$email = trim($data["email"] ?? ""); // int


//? ====================
//? START
//? ====================
// ✅ Reset mật khẩu, gửi mật khẩu mới về email
resetPassword($email);


//? ====================
//? FUNCTIONS
//? ====================
function resetPassword($email)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($email === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra định dạng email
   if (!validateEmail($email)) {
      $response = new ResponseAPI(3, "Không đúng định dạng email");
      $response->send();
      return;
   }

   // Kiểm tra email tài khoản có tồn tại không
   $id = checkEmailExist($email);
   if ($id < 0) {
      $response = new ResponseAPI(4, "Không tìm thấy tài khoản");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $updatedAt = getCurrentDatetime();

   // Tạo mật khẩu và MD5 mật khẩu
   $newPassword = generateRandomString(12);
   $password = md5($newPassword);

   // Các chuỗi truy vấn
   $baseQuery = "UPDATE `$tableName` SET `updatedAt` = '$updatedAt'";
   $mainQuery = "," . "`password` = '$password'";
   $endQuery = "WHERE `id` = '$id' AND `deletedAt` IS NULL";

   // Thực thi query
   $query = $baseQuery . " " . $mainQuery . " " . $endQuery;
   if (performsQueryAndResponseToClient($query)) {

      // Tạo đối tượng mail
      $mail = new ResetPasswordPlayerMail($email, $newPassword);

      // Send mail
      if ($mail->send()) {
         $response = new ResponseAPI(1, "Thành công");
         $response->send();
      } else {
         $response = new ResponseAPI(5, "Gửi mail không thành công");
         $response->send();
      }
   } else {
      $response = new ResponseAPI(2, "Thất bại");
      $response->send();
   }

   // Đóng kết nối
   $connect->close();
}

// Thực thi truy vấn và trả về kết quả cho Client
function performsQueryAndResponseToClient($query)
{
   global $connect;

   $result = mysqli_query($connect, $query);
   return $result;
}

// Lấy id tài khoản player từ email
function checkEmailExist($email)
{
   global $connect;

   $query = "SELECT `id` FROM `player` WHERE `email` = '$email' AND `deletedAt` IS NULL LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && (($obj = $result->fetch_object()) != null)) {
      return $obj->id;
   }

   return -1;
}

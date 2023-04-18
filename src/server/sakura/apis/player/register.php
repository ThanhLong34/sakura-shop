<?php
//? ====================
//? IMPORTS
//? ====================
require("../../core/config.php");
require("../../core/connectDatabase.php");
require("../../helpers/functions.php");
require("../../classes/ResponseAPI.php");


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
$tableName = "player";
$data = getJSONPayloadRequest();

$phoneNumber = trim($data["phoneNumber"] ?? ""); // string
$password = trim($data["password"] ?? ""); // string
$email = trim($data["email"] ?? ""); // string


//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($phoneNumber, $password, $email);


//? ====================
//? FUNCTIONS
//? ====================
function add($phoneNumber, $password, $email)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($phoneNumber === "" || $password === "" || $email === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra item tồn tại trong CSDL theo các tiêu chí
   if (checkItemExist($phoneNumber)) {
      $response = new ResponseAPI(3, "Số điện thoại đã tồn tại");
      $response->send();
      return;
   }

   // Kiểm tra định dạng số điện thoại
   if (!validatePhoneNumber($phoneNumber)) {
      $response = new ResponseAPI(5, "Không đúng định dạng số điện thoại");
      $response->send();
      return;
   }

   // Kiểm tra định dạng email
   if (!validateEmail($email)) {
      $response = new ResponseAPI(4, "Không đúng định dạng email");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // MD5 mật khẩu
   $password = md5($password);

   // Tạo ngẫu nhiên tên người chơi
   $nickname = "player_" . generateRandomString(6);

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `phoneNumber`, `password`, `email`, `nickname`) 
               VALUES('$createdAt', '$phoneNumber', '$password', '$email', '$nickname')";

   if (($accountId = performsQueryAndResponseToClient($query)) > 0) {
      $obj = responsePlayerAccount($accountId);
      if ($obj) {
         $response = new ResponseAPI(1, "Thành công", $obj, 1);
         $response->send();
      } else {
         $response = new ResponseAPI(2, "Thất bại");
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
   if ($result) {
      return mysqli_insert_id($connect);
   }

   return -1;
}

// Kiểm tra item tồn tại trong CSDL theo các tiêu chí
function checkItemExist($phoneNumber)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `deletedAt` IS NULL AND `phoneNumber` = '$phoneNumber' LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && mysqli_num_rows($result) > 0) {
      return true;
   }

   return false;
}

// Trả về tài khoản vừa đăng ký thành công cho Client
function responsePlayerAccount($id)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `deletedAt` IS NULL AND `id` = '$id' LIMIT 1";
   $result = mysqli_query($connect, $query);
   $obj = null;

   if ($result) {
      $obj = $result->fetch_object();
   }

   return $obj;
}

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
$tableName = "admin";
$data = getJSONPayloadRequest();

$username = trim($data["username"] ?? ""); // string
$password = trim($data["password"] ?? ""); // string
$email = trim($data["email"] ?? ""); // string
$phoneNumber = trim($data["phoneNumber"] ?? ""); // string


//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($username, $password, $email, $phoneNumber);


//? ====================
//? FUNCTIONS
//? ====================
function add($username, $password, $email, $phoneNumber)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($username === "" || $password === "" || $email === "" || $phoneNumber === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra item tồn tại trong CSDL theo các tiêu chí
   if (checkItemExist($username)) {
      $response = new ResponseAPI(3, "Tên đăng nhập đã tồn tại");
      $response->send();
      return;
   }

   // Kiểm tra định dạng email
   if (!validateEmail($email)) {
      $response = new ResponseAPI(4, "Không đúng định dạng email");
      $response->send();
      return;
   }

   // Kiểm tra định dạng số điện thoại
   if (!validatePhoneNumber($phoneNumber)) {
      $response = new ResponseAPI(5, "Không đúng định dạng số điện thoại");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // MD5 mật khẩu
   $password = md5($password);

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `username`, `password`, `email`, `phoneNumber`) 
               VALUES('$createdAt', '$username', '$password', '$email', '$phoneNumber')";
   performsQueryAndResponseToClient($query);

   // Đóng kết nối
   $connect->close();
}

// Thực thi truy vấn và trả về kết quả cho Client
function performsQueryAndResponseToClient($query)
{
   global $connect;

   $result = mysqli_query($connect, $query);

   if ($result) {
      $response = new ResponseAPI(1, "Thành công");
      $response->send();
   } else {
      $response = new ResponseAPI(2, "Thất bại");
      $response->send();
   }
}

// Kiểm tra item tồn tại trong CSDL theo các tiêu chí
function checkItemExist($username)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `deletedAt` IS NULL AND `username` = '$username' LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && mysqli_num_rows($result) > 0) {
      return true;
   }

   return false;
}

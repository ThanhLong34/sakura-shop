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

//? ====================
//? START
//? ====================
// ✅ Đăng nhập tài khoản
login($username, $password);


//? ====================
//? FUNCTIONS
//? ====================
function login($username, $password)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($username === "" || $password === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // MD5 mật khẩu
   $password = md5($password);

   // Thực thi query
   $query = "SELECT `$tableName`.*
      FROM `$tableName`
      WHERE `$tableName`.`deletedAt` IS NULL
      AND `$tableName`.`username` = '$username'
      AND `$tableName`.`password` = '$password'
      LIMIT 1";
   performsQueryAndResponseToClient($query);

   // Đóng kết nối
   $connect->close();
}

// Thực thi truy vấn và trả về kết quả cho Client
function performsQueryAndResponseToClient($query)
{
   global $connect;

   $result = mysqli_query($connect, $query);

   if ($result && ($obj = $result->fetch_object()) != null) {
      $response = new ResponseAPI(1, "Thành công", $obj, 1);
      $response->send();
   } else {
      $response = new ResponseAPI(2, "Sai tên đăng nhập hoặc mật khẩu");
      $response->send();
   }
}

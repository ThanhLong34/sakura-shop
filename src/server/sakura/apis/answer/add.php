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
$tableName = "answer";
$data = getJSONPayloadRequest();

$content = trim($data["content"] ?? ""); // string
$isRight = (bool)$data["isRight"]; // bool
$questionId = $data["questionId"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($content, $isRight, $questionId);


//? ====================
//? FUNCTIONS
//? ====================
function add($content, $isRight, $questionId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($content === "" || !is_numeric($questionId) || !is_bool($isRight)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `content`, `isRight`, `questionId`) 
               VALUES('$createdAt', '$content', '$isRight', '$questionId')";
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

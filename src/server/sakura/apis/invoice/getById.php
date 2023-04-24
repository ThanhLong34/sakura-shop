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
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$tableName = "invoice";

$id = $_GET["id"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Lấy record theo id
getById($id);


//? ====================
//? FUNCTIONS
//? ====================
function getById($id)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($id)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Thực thi query
   $query = "SELECT `$tableName`.*
      FROM `$tableName`
      WHERE `$tableName`.`deletedAt` IS NULL
      AND `$tableName`.`id` = '$id'
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

   if ($result) {
      $item = $result->fetch_object();
      if ($item != null) {
         // Lấy danh sách câu trả lời
         $item->answers = getAnswersByQuestionId($item->id);

         $response = new ResponseAPI(1, "Thành công", $item, 1);
         $response->send();
      } else {
         $response = new ResponseAPI(2, "Không tìm thấy");
         $response->send();
      }
   } else {
      $response = new ResponseAPI(3, "Thất bại");
      $response->send();
   }
}

// Lấy danh sách câu trả lời
function getAnswersByQuestionId($questionId)
{
   global $connect;

   $query = "SELECT * FROM `answer` WHERE `questionId` = '$questionId'";
   $result = mysqli_query($connect, $query);

   $list = [];

   if ($result) {
      while ($obj = $result->fetch_object()) {
         array_push($list, $obj);
      }
   }

   return $list;
}

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
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$tableName = "gamedata";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$title = trim($data["title"] ?? ""); // string
$value = trim($data["value"] ?? ""); // string


//? ====================
//? START
//? ====================
// ✅ Cập nhật record
update($id, $title, $value);


//? ====================
//? FUNCTIONS
//? ====================
function update($id, $title, $value)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($id)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $updatedAt = getCurrentDatetime();

   // Các chuỗi truy vấn
   $baseQuery = "UPDATE `$tableName` SET `updatedAt` = '$updatedAt'";
   $mainQuery = "";
   $endQuery = "WHERE `id` = '$id' AND `deletedAt` IS NULL";

   // Cập nhật title
   if ($title !== "") {

      // Kiểm tra item tồn tại trong CSDL theo các tiêu chí
      if (checkItemExist($title)) {
         $response = new ResponseAPI(3, "Dữ liệu trò chơi đã tồn tại");
         $response->send();
         return;
      }

      $mainQuery .= "," . "`title` = '$title'";
   }

   // Cập nhật value
   if ($value !== "") {
      $mainQuery .= "," . "`value` = '$value'";
   }

   // Thực thi query
   $query = $baseQuery . " " . $mainQuery . " " . $endQuery;
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
function checkItemExist($title)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `deletedAt` IS NULL AND `title` = '$title' LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && mysqli_num_rows($result) > 0) {
      return true;
   }

   return false;
}

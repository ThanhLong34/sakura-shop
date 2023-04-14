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
$tableName = "player";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$health = $data["health"] ?? ""; // int
$star = $data["star"] ?? ""; // int
$diamond = $data["diamond"] ?? ""; // int
$experience = $data["experience"] ?? ""; // int
$level = $data["level"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Cập nhật dữ liệu trò chơi của người chơi
updateGameData($id, $health, $star, $diamond, $experience, $level);


//? ====================
//? FUNCTIONS
//? ====================
function updateGameData($id, $health, $star, $diamond, $experience, $level)
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

   // Cập nhật health
   if (is_numeric($health)) {
      $mainQuery .= "," . "`health` = '$health'";
   }

   // Cập nhật star
   if (is_numeric($star)) {
      $mainQuery .= "," . "`star` = '$star'";
   }

   // Cập nhật diamond
   if (is_numeric($diamond)) {
      $mainQuery .= "," . "`diamond` = '$diamond'";
   }

   // Cập nhật experience
   if (is_numeric($experience)) {
      $mainQuery .= "," . "`experience` = '$experience'";
   }

   // Cập nhật level
   if (is_numeric($level)) {
      $mainQuery .= "," . "`level` = '$level'";
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

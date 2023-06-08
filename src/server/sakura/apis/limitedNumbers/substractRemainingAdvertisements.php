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
$tableName = "limitednumbers";
$data = getJSONPayloadRequest();

$playerId = $data["playerId"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Cập nhật record
update($playerId);


//? ====================
//? FUNCTIONS
//? ====================
function update($playerId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($playerId)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   $limitedNumberRecord = getLimitedNumberRecordByPlayerId($playerId);
   if ($limitedNumberRecord == null) {
      $response = new ResponseAPI(3, "Không đủ tìm thấy người chơi");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $updatedAt = getCurrentDatetime();

   // Các chuỗi truy vấn
   $baseQuery = "UPDATE `$tableName` SET `updatedAt` = '$updatedAt'";
   $mainQuery = "";
   $endQuery = "WHERE `id` = '$limitedNumberRecord->id' AND `deletedAt` IS NULL";

   // Cập nhật remainingAdvertisements
   $remain = $limitedNumberRecord->remainingAdvertisements - 1;
   if ($remain < 0) $remain = 0;
   $mainQuery .= "," . "`remainingAdvertisements` = '$remain'";

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

// Lấy record theo playerId trong bảng limited numbers
function getLimitedNumberRecordByPlayerId($playerId)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `playerId` = '$playerId' AND `deletedAt` IS NULL LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && ($limitedNumberRecord = $result->fetch_object()) != null) {
      return $limitedNumberRecord;
   }

   return null;
}

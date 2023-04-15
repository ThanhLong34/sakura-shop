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
$tableName = "card";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$imageId = $data["imageId"] ?? ""; // int
$title = trim($data["title"] ?? ""); // string
$brand = trim($data["brand"] ?? ""); // string
$healthReward = $data["healthReward"] ?? ""; // int
$starReward = $data["starReward"] ?? ""; // int
$diamondReward = $data["diamondReward"] ?? ""; // int
$occurrenceRate = $data["occurrenceRate"] ?? ""; // int
$topicId = $data["topicId"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Cập nhật record
update($id, $imageId, $title, $brand, $healthReward, $starReward, $diamondReward, $occurrenceRate, $topicId);


//? ====================
//? FUNCTIONS
//? ====================
function update($id, $imageId, $title, $brand, $healthReward, $starReward, $diamondReward, $occurrenceRate, $topicId)
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

   // Cập nhật imageId
   if (is_numeric($imageId)) {
      $mainQuery .= "," . "`imageId` = '$imageId'";
   }

   // Cập nhật title
   $mainQuery .= "," . "`title` = '$title'";

   // Cập nhật brand
   $mainQuery .= "," . "`brand` = '$brand'";

   // Cập nhật healthReward
   if (is_numeric($healthReward)) {
      $mainQuery .= "," . "`healthReward` = '$healthReward'";
   }

   // Cập nhật starReward
   if (is_numeric($starReward)) {
      $mainQuery .= "," . "`starReward` = '$starReward'";
   }

   // Cập nhật diamondReward
   if (is_numeric($diamondReward)) {
      $mainQuery .= "," . "`diamondReward` = '$diamondReward'";
   }

   // Cập nhật occurrenceRate
   if (is_numeric($occurrenceRate)) {
      $mainQuery .= "," . "`occurrenceRate` = '$occurrenceRate'";
   }

   // Cập nhật topicId
   if (is_numeric($topicId)) {
      $mainQuery .= "," . "`topicId` = '$topicId'";
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

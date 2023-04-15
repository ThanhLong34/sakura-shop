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
$tableName = "advertisement";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$imageId = $data["imageId"] ?? ""; // int
$videoId = $data["videoId"] ?? ""; // int
$title = trim($data["title"] ?? ""); // string
$description = trim($data["description"] ?? ""); // string
$duration = $data["duration"] ?? ""; // int
$healthReward = $data["healthReward"] ?? ""; // int
$starReward = $data["starReward"] ?? ""; // int
$diamondReward = $data["diamondReward"] ?? ""; // int
$occurrenceRate = $data["occurrenceRate"] ?? ""; // int
$advertisementTypeId = $data["advertisementTypeId"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Cập nhật record
update($id, $imageId, $videoId, $title, $description, $duration, $healthReward, $starReward, $diamondReward, $occurrenceRate, $advertisementTypeId);


//? ====================
//? FUNCTIONS
//? ====================
function update($id, $imageId, $videoId, $title, $description, $duration, $healthReward, $starReward, $diamondReward, $occurrenceRate, $advertisementTypeId)
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
   } else if ($imageId === "NULL") {
      $mainQuery .= "," . "`imageId` = NULL";
   }

   // Cập nhật videoId
   if (is_numeric($videoId)) {
      $mainQuery .= "," . "`videoId` = '$videoId'";
   } else if ($videoId === "NULL") {
      $mainQuery .= "," . "`videoId` = NULL";
   }

   // Cập nhật title
   if ($title !== "") {
      $mainQuery .= "," . "`title` = '$title'";
   }

   // Cập nhật description
   $mainQuery .= "," . "`description` = '$description'";

   // Cập nhật duration
   if (is_numeric($duration)) {
      $mainQuery .= "," . "`duration` = '$duration'";
   }

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

   // Cập nhật advertisementTypeId
   if (is_numeric($advertisementTypeId)) {
      $mainQuery .= "," . "`advertisementTypeId` = '$advertisementTypeId'";
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

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
$tableName = "card";
$data = getJSONPayloadRequest();

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
// ✅ Thêm record 
add($imageId, $title, $brand, $healthReward, $starReward, $diamondReward, $occurrenceRate, $topicId);


//? ====================
//? FUNCTIONS
//? ====================
function add($imageId, $title, $brand, $healthReward, $starReward, $diamondReward, $occurrenceRate, $topicId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (($imageId !== "" && !is_numeric($imageId)) || // option
      ($healthReward !== "" && !is_numeric($healthReward)) || // option
      ($starReward !== "" && !is_numeric($starReward)) || // option
      ($diamondReward !== "" && !is_numeric($diamondReward)) || // option
      ($occurrenceRate !== "" && !is_numeric($occurrenceRate)) || // option
      !is_numeric($topicId) // require
   ) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `imageId`, `title`, `brand`, `healthReward`, `starReward`, `diamondReward`, `occurrenceRate`, `topicId`) 
               VALUES('$createdAt', '$imageId', '$title', '$brand', '$healthReward', '$starReward', '$diamondReward', '$occurrenceRate', '$topicId')";
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

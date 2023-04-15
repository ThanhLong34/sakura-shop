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
$tableName = "advertisement";
$data = getJSONPayloadRequest();

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
// ✅ Thêm record 
add($imageId, $videoId, $title, $description, $duration, $healthReward, $starReward, $diamondReward, $occurrenceRate, $advertisementTypeId);


//? ====================
//? FUNCTIONS
//? ====================
function add($imageId, $videoId, $title, $description, $duration, $healthReward, $starReward, $diamondReward, $occurrenceRate, $advertisementTypeId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (
      ($imageId !== "" && !is_numeric($imageId)) || // option
      ($videoId !== "" && !is_numeric($videoId)) || // option
      ($duration !== "" && !is_numeric($duration)) || // option
      ($healthReward !== "" && !is_numeric($healthReward)) || // option
      ($starReward !== "" && !is_numeric($starReward)) || // option
      ($diamondReward !== "" && !is_numeric($diamondReward)) || // option
      ($occurrenceRate !== "" && !is_numeric($occurrenceRate)) || // option
      $title === "" ||
      !is_numeric($advertisementTypeId) // require
   ) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `imageId`, `videoId`, `title`, `description`, `duration`, `healthReward`, `starReward`, `diamondReward`, `occurrenceRate`, `advertisementTypeId`) 
               VALUES('$createdAt', '$imageId', '$videoId', '$title', '$description', '$duration', '$healthReward', '$starReward', '$diamondReward', '$occurrenceRate', '$advertisementTypeId')";
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

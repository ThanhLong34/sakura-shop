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
$tableName = "level";
$data = getJSONPayloadRequest();

$levelNumber = $data["levelNumber"] ?? ""; // int
$experienceRequired = $data["experienceRequired"] ?? ""; // int
$healthReward = $data["healthReward"] ?? ""; // int
$starReward = $data["starReward"] ?? ""; // int
$diamondReward = $data["diamondReward"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($levelNumber, $experienceRequired, $healthReward, $starReward, $diamondReward);


//? ====================
//? FUNCTIONS
//? ====================
function add($levelNumber, $experienceRequired, $healthReward, $starReward, $diamondReward)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (
      !is_numeric($levelNumber) || 
      !is_numeric($experienceRequired) ||
      ($healthReward !== "" && !is_numeric($healthReward)) ||
      ($starReward !== "" && !is_numeric($starReward)) ||
      ($diamondReward !== "" && !is_numeric($diamondReward))
   ) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra item tồn tại trong CSDL theo các tiêu chí
   if (checkItemExist($levelNumber)) {
      $response = new ResponseAPI(3, "Cấp độ đã tồn tại");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `levelNumber`, `experienceRequired`, `healthReward`, `starReward`, `diamondReward`) 
               VALUES('$createdAt', '$levelNumber', '$experienceRequired', '$healthReward', '$starReward', '$diamondReward')";
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
function checkItemExist($levelNumber)
{
   global $connect, $tableName;

   $query = "SELECT * FROM `$tableName` WHERE `deletedAt` IS NULL AND `levelNumber` = '$levelNumber' LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && mysqli_num_rows($result) > 0) {
      return true;
   }

   return false;
}

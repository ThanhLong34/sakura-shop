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
$tableName = "level";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$levelNumber = $data["levelNumber"] ?? ""; // int
$experienceRequired = $data["experienceRequired"] ?? ""; // int
$healthReward = $data["healthReward"] ?? ""; // int
$starReward = $data["starReward"] ?? ""; // int
$diamondReward = $data["diamondReward"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Cập nhật
update($id, $levelNumber, $experienceRequired, $healthReward, $starReward, $diamondReward);


//? ====================
//? FUNCTIONS
//? ====================
function update($id, $levelNumber, $experienceRequired, $healthReward, $starReward, $diamondReward)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($id === "" || !is_numeric($id)) {
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

   // Cập nhật levelNumber
   if ($levelNumber !== "" && is_numeric($levelNumber)) {

      // Kiểm tra item tồn tại trong CSDL theo các tiêu chí
      if (checkItemExist($levelNumber)) {
         $response = new ResponseAPI(3, "Cấp độ đã tồn tại");
         $response->send();
         return;
      }

      $mainQuery .= "," . "`levelNumber` = '$levelNumber'";
   }

   // Cập nhật experienceRequired
   if ($experienceRequired !== "" && is_numeric($experienceRequired)) {
      $mainQuery .= "," . "`experienceRequired` = '$experienceRequired'";
   }

   // Cập nhật healthReward
   if ($healthReward !== "" && is_numeric($healthReward)) {
      $mainQuery .= "," . "`healthReward` = '$healthReward'";
   }

   // Cập nhật starReward
   if ($starReward !== "" && is_numeric($starReward)) {
      $mainQuery .= "," . "`starReward` = '$starReward'";
   }

   // Cập nhật diamondReward
   if ($diamondReward !== "" && is_numeric($diamondReward)) {
      $mainQuery .= "," . "`diamondReward` = '$diamondReward'";
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

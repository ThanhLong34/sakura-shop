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
$tableName = "limitednumbers";
$data = getJSONPayloadRequest();

$playerId = $data["playerId"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Thêm record 
login($playerId);


//? ====================
//? FUNCTIONS
//? ====================
function login($playerId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($playerId)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   $player = getPlayerById($playerId);

   if ($player != null) {

      $loggedAt = getCurrentDatetime();
      $loggedDate = explode(' ', $loggedAt)[1];
      $limitedNumberRecord = getLimitedNumberRecordByPlayerId($playerId);
      $remainingInit = 3;

      if ($limitedNumberRecord === null) { // Chưa tồn tại
         $createdAt = $loggedAt;

         // Thực thi query thêm mới
         $query = "INSERT INTO `$tableName`(`createdAt`, `playerId`, `loggedAt`, `remainingQuestions`, `remainingAdvertisements`) 
            VALUES('$createdAt', '$playerId', '$loggedAt', '$remainingInit', '$remainingInit')";
         insertLimitedNumber($query);
      } else { // Đã tồn tại
         $recordLoggedDate = explode(' ', $limitedNumberRecord->loggedAt)[1];

         if ($recordLoggedDate !== $loggedDate) {
            $updatedAt = $loggedAt;

            // Thực thi query cập nhật
            $query = "UPDATE `$tableName` 
               SET `updatedAt` = '$updatedAt', `loggedAt` = '$loggedAt', `remainingQuestions` = '$remainingInit', `remainingAdvertisements` = '$remainingInit'
               WHERE `id` = '$limitedNumberRecord->id' AND `deletedAt` IS NULL";
            updateLimitedNumber($query);
         } else {
            $response = new ResponseAPI(1, "Thành công", $limitedNumberRecord, 1);
            $response->send();
            return;
         }
      }

      $limitedNumberRecord = getLimitedNumberRecordByPlayerId($playerId);
      $response = new ResponseAPI(1, "Thành công", $limitedNumberRecord, 1);
      $response->send();
   } else {
      $response = new ResponseAPI(6, "Không tìm thấy dữ liệu người chơi");
      $response->send();
      return;
   }

   // Đóng kết nối
   $connect->close();
}

// Thêm limited number
function insertLimitedNumber($query)
{
   global $connect;

   $result = mysqli_query($connect, $query);
   if ($result) {
      return mysqli_insert_id($connect);
   }

   return -1;
}

// Cập nhật limited number
function updateLimitedNumber($query)
{
   global $connect;

   $result = mysqli_query($connect, $query);
   return $result;
}

// Lấy thông tin player
function getPlayerById($playerId)
{
   global $connect;

   $query = "SELECT * FROM `player` WHERE `id` = '$playerId' AND `deletedAt` IS NULL LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && ($player = $result->fetch_object()) != null) {
      return $player;
   }

   return null;
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

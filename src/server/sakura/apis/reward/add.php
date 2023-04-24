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
$tableName = "reward";
$data = getJSONPayloadRequest();

$giftId = $data["giftId"] ?? ""; // int
$playerId = $data["playerId"] ?? ""; // int
$playerPhoneNumber = trim($data["playerPhoneNumber"] ?? ""); // string
$invoiceRewardCode = trim($data["invoiceRewardCode"] ?? ""); // string


//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($giftId, $playerId, $playerPhoneNumber, $invoiceRewardCode);


//? ====================
//? FUNCTIONS
//? ====================
function add($giftId, $playerId, $playerPhoneNumber, $invoiceRewardCode)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($giftId) || !is_numeric($playerId) || $playerPhoneNumber === "" || $invoiceRewardCode === "") {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   $gift = getGiftById($giftId);
   $player = getPlayerById($playerId);

   if ($gift != null && $player != null) {
      // Trừ star & diamond
      $playerStar = $player->star - $gift->starCost;
      $playerDiamond = $player->diamond - $gift->diamondCost;

      if ($playerStar < 0 || $playerDiamond < 0) {
         $response = new ResponseAPI(3, "Không đủ điều kiện đổi thưởng");
         $response->send();
         return;
      }

      if (!checkInvoice($playerPhoneNumber, $invoiceRewardCode)) {
         $response = new ResponseAPI(4, "Sai số điện thoại, hoặc sai mã nhận thưởng, hoặc hóa đơn đã quá hạn để đổi thưởng");
         $response->send();
         return;
      }

      // Cập nhật game data cho player
      if (updatePlayerGameData($playerId, $playerStar, $playerDiamond)) {
         // createdAt, updateAt, deletedAt
         $createdAt = getCurrentDatetime();

         // Thực thi query
         $query = "INSERT INTO `$tableName`(`createdAt`, `giftId`, `playerId`, `starCost`, `diamondCost`, `invoiceRewardCode`) 
            VALUES('$createdAt', '$giftId', '$playerId', '$gift->starCost', '$gift->diamondCost', '$invoiceRewardCode')";
         performsQueryAndResponseToClient($query);
      } else {
         $response = new ResponseAPI(5, "Không thể cập nhật dữ liệu trò chơi của người chơi");
         $response->send();
         return;
      }
   } else {
      $response = new ResponseAPI(6, "Không tìm thấy dữ liệu phần thưởng hoặc người chơi");
      $response->send();
      return;
   }

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

// Lấy thông tin gift
function getGiftById($giftId)
{
   global $connect;

   $query = "SELECT * FROM `gift` WHERE `id` = '$giftId' AND `deletedAt` IS NULL LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && ($gift = $result->fetch_object()) != null) {
      return $gift;
   }

   return null;
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

// Cập nhật lại game data cho player
function updatePlayerGameData($playerId, $star, $diamond)
{
   global $connect;

   $query = "UPDATE `player` SET `star` = '$star', `diamond` = '$diamond' WHERE `id` = '$playerId' AND `deletedAt` IS NULL";
   $result = mysqli_query($connect, $query);

   return $result;
}

// Kiểm tra mã đổi thưởng
function checkInvoice($phoneNumber, $rewardCode)
{
   global $connect;

   // Get current date
   $currentDate = date("d/m/Y");

   $query = "SELECT * FROM `invoice` 
      WHERE `deletedAt` IS NULL 
      AND `phoneNumber` = '$phoneNumber'
      AND `rewardCode` = '$rewardCode' 
      AND `createdAt` LIKE '%$currentDate'
      LIMIT 1";
   $result = mysqli_query($connect, $query);

   if ($result && mysqli_num_rows($result) > 0) {
      return true;
   }

   return false;
}

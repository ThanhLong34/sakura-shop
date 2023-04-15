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
$tableName = "gift";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int
$imageId = $data["imageId"] ?? ""; // int
$name = trim($data["name"] ?? ""); // string
$brand = trim($data["brand"] ?? ""); // string
$description = trim($data["description"] ?? ""); // string
$starCost = $data["starCost"] ?? ""; // int
$diamondCost = $data["diamondCost"] ?? ""; // int
$allowToReceiveOnline = $data["allowToReceiveOnline"] ?? ""; // bool
$isSpecial = $data["isSpecial"] ?? ""; // bool
$isShow = $data["isShow"] ?? ""; // bool


//? ====================
//? START
//? ====================
// ✅ Cập nhật record
update($id, $imageId, $name, $brand, $description, $starCost, $diamondCost, $allowToReceiveOnline, $isSpecial, $isShow);


//? ====================
//? FUNCTIONS
//? ====================
function update($id, $imageId, $name, $brand, $description, $starCost, $diamondCost, $allowToReceiveOnline, $isSpecial, $isShow)
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

   // Cập nhật name
   if ($name !== "") {
      $mainQuery .= "," . "`name` = '$name'";
   }

   // Cập nhật brand
   $mainQuery .= "," . "`brand` = '$brand'";

   // Cập nhật description
   $mainQuery .= "," . "`description` = '$description'";

   // Cập nhật starCost
   if (is_numeric($starCost)) {
      $mainQuery .= "," . "`starCost` = '$starCost'";
   }

   // Cập nhật diamondCost
   if (is_numeric($diamondCost)) {
      $mainQuery .= "," . "`diamondCost` = '$diamondCost'";
   }

   // Cập nhật allowToReceiveOnline
   if (is_bool($allowToReceiveOnline)) {
      $mainQuery .= "," . "`allowToReceiveOnline` = '$allowToReceiveOnline'";
   }

   // Cập nhật isSpecial
   if (is_bool($isSpecial)) {
      $mainQuery .= "," . "`isSpecial` = '$isSpecial'";
   }

   // Cập nhật isShow
   if (is_bool($isShow)) {
      $mainQuery .= "," . "`isShow` = '$isShow'";
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

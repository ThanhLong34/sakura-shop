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
$tableName = "gift";
$data = getJSONPayloadRequest();

$imageId = $data["imageId"] ?? ""; // int
$name = trim($data["name"] ?? ""); // string
$brand = trim($data["brand"] ?? ""); // string
$description = trim($data["description"] ?? ""); // string
$starCost = $data["starCost"] ?? ""; // int
$diamondCost = $data["diamondCost"] ?? ""; // int
$allowToReceiveOnline = (bool)$data["allowToReceiveOnline"]; // bool
$isSpecial = (bool)$data["isSpecial"]; // bool
$isShow = (bool)$data["isShow"]; // bool

//? ====================
//? START
//? ====================
// ✅ Thêm record 
add($imageId, $name, $brand, $description, $starCost, $diamondCost, $allowToReceiveOnline, $isSpecial, $isShow);


//? ====================
//? FUNCTIONS
//? ====================
function add($imageId, $name, $brand, $description, $starCost, $diamondCost, $allowToReceiveOnline, $isSpecial, $isShow)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (
      ($imageId !== "" && !is_numeric($imageId)) || // option
      ($starCost !== "" && !is_numeric($starCost)) || // option
      ($diamondCost !== "" && !is_numeric($diamondCost)) || // option
	   $name === "" // require
   ) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thực thi query
   $query = "INSERT INTO `$tableName`(`createdAt`, `imageId`, `name`, `brand`, `description`, `starCost`, `diamondCost`, `allowToReceiveOnline`, `isSpecial`, `isShow`) 
               VALUES('$createdAt', '$imageId', '$name', '$brand', '$description', '$starCost', '$diamondCost', '$allowToReceiveOnline', '$isSpecial', '$isShow')";
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

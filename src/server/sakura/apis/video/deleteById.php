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
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$tableName = "video";
$data = getJSONPayloadRequest();

$id = $data["id"] ?? ""; // int


//? ====================
//? START
//? ====================
// ✅ Xóa record theo id
deleteById($id);


//? ====================
//? FUNCTIONS
//? ====================
function deleteById($id)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (!is_numeric($id)) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // Kiểm tra xem image có tồn tại trong DB không
   $query = "SELECT * FROM `$tableName` WHERE `id` = '$id' LIMIT 1";
   $result = mysqli_query($connect, $query);
   $obj = null;

   if (!$result || ($obj = $result->fetch_object()) === null) {
      $response = new ResponseAPI(3, "Không tìm thấy file ảnh");
      $response->send();
      return;
   }

   // Lấy path file ảnh trên server
   $fileLocation = LOCATION_UPLOAD_VIDEO . $obj->filename;

   // Xóa file trên server
   if (unlink($fileLocation)) {
      // Thực thi query
      $query = "DELETE FROM `$tableName` WHERE `id` = '$id'";
      performsQueryAndResponseToClient($query);
   } else {
      $response = new ResponseAPI(4, "Xóa file ảnh thất bại");
      $response->send();
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

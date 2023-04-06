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
$tableName = "image";

$file = $_FILES['image'] ?? null; // image file


//? ====================
//? START
//? ====================
// ✅ Tải ảnh lên server
upload($file);


//? ====================
//? FUNCTIONS
//? ====================
function upload($file)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if ($file === null) {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   // createdAt, updateAt, deletedAt
   $createdAt = getCurrentDatetime();

   // Thông tin file hình ảnh
   $filename = $file['name'];
   $fileTmpName = $file['tmp_name'];
   $size = $file['size'];

   // Lấy file extension
   $imageFileType = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

   /* Kiểm tra định dạng file */
   if (in_array($imageFileType, IMAGE_EXTENSIONS_VALIDATE)) {
      // Tạo filename
      while (true) {
         $filename = uniqid('imagefile', false) . ".$imageFileType";
         if (!file_exists(LOCATION_UPLOAD_IMAGE . $filename)) break;
      }

      // Tạo link
      $link = PATH_UPLOAD_IMAGE . $filename;

      /* Upload file */
      if (move_uploaded_file($fileTmpName, LOCATION_UPLOAD_IMAGE . $filename)) {

         // Thêm record vào CSDL
         $query = "INSERT INTO `$tableName`(`createdAt`, `link`, `filename`, `size`) VALUES('$createdAt', '$link', '$filename', $size)";
         performsQueryAndResponseToClient($query, $createdAt, $link, $filename, $size);
         
      } else {
         $response = new ResponseAPI(2, "Tạo file ảnh thất bại");
         $response->send();
      }
   } else {
      $response = new ResponseAPI(3, "Chỉ chấp nhận các định dạng file sau: " . implode(" | ", IMAGE_EXTENSIONS_VALIDATE));
      $response->send();
   }

   // Đóng kết nối
   $connect->close();
}

// Thực thi truy vấn và trả về kết quả cho Client
function performsQueryAndResponseToClient($query, $createdAt, $link, $filename, $size)
{
   global $connect;

   $result = mysqli_query($connect, $query);

   if ($result) {
      $imageObj = new stdClass;

      $imageObj->id = mysqli_insert_id($connect);
      $imageObj->createdAt = $createdAt;
      $imageObj->link = $link;
      $imageObj->filename = $filename;
      $imageObj->size = $size;

      $response = new ResponseAPI(1, "Thành công", $imageObj, 1);
      $response->send();
   } else {
      $response = new ResponseAPI(2, "Thất bại");
      $response->send();
   }
}

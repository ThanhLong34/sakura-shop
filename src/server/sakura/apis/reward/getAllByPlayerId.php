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
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");


//? ====================
//? CHECK PERMISSTION
//? ====================
if (!checkPermissionFunction()) exit;


//? ====================
//? PARAMETERS & PAYLOAD
//? ====================
$tableName = "reward";

$limit = $_GET["limit"] ?? ""; // int, limit = "", hoặc không có payload để lấy tất cả
$offset = $_GET["offset"] ?? ""; // int
$searchType = trim($_GET["searchType"] ?? ""); // string
$searchValue = trim($_GET["searchValue"] ?? ""); // string
$fillType = trim($_GET["fillType"] ?? ""); // string
$fillValue = trim($_GET["fillValue"] ?? ""); // string
$orderby = trim($_GET["orderby"] ?? "id"); // string
$reverse = ($_GET["reverse"] ?? "false") === "true"; // boolean
$playerId = $_GET["playerId"] ?? ""; // int

//? ====================
//? START
//? ====================
// ✅ Lấy tất cả records theo playerId
getAllByPlayerId($limit, $offset, $searchType, $searchValue, $fillType, $fillValue, $orderby, $reverse, $playerId);


//? ====================
//? FUNCTIONS
//? ====================
function getAllByPlayerId($limit, $offset, $searchType, $searchValue, $fillType, $fillValue, $orderby, $reverse, $playerId)
{
   global $connect, $tableName;

   // Kiểm tra dữ liệu payload
   if (($limit !== "" && !is_numeric($limit)) || ($offset !== "" && !is_numeric($offset)) || !is_bool($reverse) || !is_numeric($playerId))
   {
      $response = new ResponseAPI(9, "Không đủ payload để thực hiện");
      $response->send();
      return;
   }

   //! Thêm tùy chỉnh Code ở đây
   $baseQuery = "SELECT `$tableName`.*,
      `gift`.`name` AS 'giftName', 
      `image`.`link` AS 'giftImageUrl'
      FROM `$tableName`
      LEFT JOIN `gift` ON `gift`.`id` = `$tableName`.`giftId`
      LEFT JOIN `image` ON `image`.`id` = `gift`.`imageId`
      WHERE `gift`.`deletedAt` IS NULL
      AND `$tableName`.`playerId` = '$playerId' 
      AND `$tableName`.`deletedAt` IS NULL";
   $optionQuery = "";


   //! Cẩn thận khi sửa Code ở đây
   //! Tùy chỉnh truy vấn theo các tiêu chí
   $querySelectAllRecord = $baseQuery . " " . $optionQuery;
   $orderbyQuery = "ORDER BY `$tableName`.`$orderby` ASC";
   if ($reverse) {
      $orderbyQuery = "ORDER BY `$tableName`.`$orderby` DESC";
   }
   $limitQuery = "LIMIT $limit OFFSET $offset";

   if ($limit === "") {
      $query = $querySelectAllRecord . " " . $orderbyQuery;
   } else {
      if ($searchType !== "" && $searchValue !== "" && $fillType !== "" && $fillValue !== "") {
         $querySelectAllRecord .= " AND `$tableName`.`$searchType` LIKE '%$searchValue%' AND `$tableName`.`$fillType` = '$fillValue'";
      } else if ($searchType !== "" && $searchValue !== "") {
         $querySelectAllRecord .= " AND `$tableName`.`$searchType` LIKE '%$searchValue%'";
      } else if ($fillType !== "" && $fillValue !== "") {
         $querySelectAllRecord .= " AND `$tableName`.`$fillType` = '$fillValue'";
      }

      $query = $querySelectAllRecord . " " . $orderbyQuery . " " . $limitQuery;
   }


   // Thực thi truy vấn
   performsQueryAndResponseToClient($query, $querySelectAllRecord);

   // Đóng kết nối
   $connect->close();
}

// Thực thi truy vấn và trả về kết quả cho Client
function performsQueryAndResponseToClient($query, $querySelectAllRecord)
{
   global $connect;

   $result = mysqli_query($connect, $query);
   $resultSelectAllRecord = mysqli_query($connect, $querySelectAllRecord);

   if ($result && $resultSelectAllRecord) {
      $list = [];

      while ($obj = $result->fetch_object()) {
         array_push($list, $obj);
      }

      $response = new ResponseAPI(1, "Thành công", $list, mysqli_num_rows($resultSelectAllRecord));
      $response->send();
   } else {
      $response = new ResponseAPI(2, "Thất bại");
      $response->send();
   }
}

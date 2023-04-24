<?php
function getJSONPayloadRequest()
{
   $data = json_decode(trim(file_get_contents("php://input")), true);
   return $data;
}

function generateRandomString($length = 10)
{
   $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   $charactersLength = strlen($characters);
   $randomString = '';
   for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[random_int(0, $charactersLength - 1)];
   }
   return $randomString;
}

function getCurrentDatetime()
{
   date_default_timezone_set('Asia/Ho_Chi_Minh');
   return date('H:i:s d/m/Y');
}

function validatePhoneNumber($phoneNumber)
{
   return preg_match("/^[\d]{10,11}$/", $phoneNumber);
}

function validateEmail($email)
{
   return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function checkPermissionFunction()
{
   $headers = apache_request_headers();

   if ($headers != null && isset($headers["role"])) {
      $role = $headers["role"];
      if ($role == '1') {
         return true;
      }
   }

   $response = new ResponseAPI(10, "Ứng dụng không được phép truy cập");
   $response->send();

   return false;
}

// Source: https://www.php.net/manual/en/function.uniqid.php#119219
// echo struuid(false); //Return sample: F4518NTQTQ
// echo struuid(true);  //Return sample: F451FAHSUCD90N6YNRBQHLZ9E1W
function struuid($entropy)
{
   $s = uniqid("", $entropy);
   $num = hexdec(str_replace(".", "", (string)$s));
   $index = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   $base = strlen($index);
   $out = '';
   for ($t = floor(log10($num) / log10($base)); $t >= 0; $t--) {
      $a = floor($num / pow($base, $t));
      $out = $out . substr($index, $a, 1);
      $num = $num - ($a * pow($base, $t));
   }
   return $out;
}

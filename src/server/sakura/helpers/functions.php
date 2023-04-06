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

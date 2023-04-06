<?php
class ResponseAPI
{
   public $code, $message, $data, $totalItem;

   public function __construct($code = 0, $message = "", $data = null, $totalItem = 0)
   {
      $this->code = $code;
      $this->message = $message;
      $this->data = $data;
      $this->totalItem = $totalItem;
   }

   public function send()
   {
      echo (json_encode($this));
   }
}

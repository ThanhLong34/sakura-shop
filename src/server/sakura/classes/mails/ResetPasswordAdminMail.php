<?php
require("../../classes/mails/Mail.php");

class ResetPasswordAdminMail extends Mail
{
   public function __construct($mailTo, $newPassword)
   {
      $this->mailTo = $mailTo;
      $this->subject = "Reset mật khẩu";
      $this->body = "Mật khẩu mới là: $newPassword";
   }
}

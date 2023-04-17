<?php
require("../../classes/mails/Mail.php");

class ResetPasswordPlayerMail extends Mail
{
   public function __construct($mailTo, $newPassword)
   {
      $this->mailTo = $mailTo;
      $this->subject = "Lấy lại mật khẩu";
      $this->body = "Mật khẩu mới của bạn là: $newPassword";
   }
}

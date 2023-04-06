<?php
require("../../classes/mails/Mail.php");

class EmptyMail extends Mail
{
   public function __construct($mailTo, $subject, $body)
   {
      $this->mailTo = $mailTo;
      $this->subject = $subject;
      $this->body = $body;
   }
}

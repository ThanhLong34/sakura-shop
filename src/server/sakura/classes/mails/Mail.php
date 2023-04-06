<?php
require("../../libraries/mail/sendMail.php");

class Mail {
   public $mailTo;
   public $subject;
   public $body;
   
   public function send() {
      return sendMail($this->mailTo, $this->subject, $this->body);
   }
}

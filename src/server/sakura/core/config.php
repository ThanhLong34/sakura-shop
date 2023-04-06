<?php
require("../../index.php");

const URL = "http://localhost/projects/sakura";
const ACCESS_CONTROL_ALLOW_ORIGIN = "*";
const ACCESS_CONTROL_ALLOW_HEADERS = "Role";
const IMAGE_EXTENSIONS_VALIDATE = ["jpeg", "jpg", "jfif", "png", "gif", "webp"];
const LOCATION_UPLOAD_IMAGE = SITE_ROOT . "/upload/images/";
const PATH_UPLOAD_IMAGE = URL . "/upload/images/";

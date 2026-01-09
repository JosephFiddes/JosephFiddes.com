<?php

include_once dirname(__DIR__) . "/include/helper.php";
include_once dirname(__DIR__) . "/include/loadenv.php";

require_once dirname(__DIR__) . '/vendor/autoload.php';

use Mpdf\Mpdf;

$tempDir = getenv("TEMP_DIR");
$mpdf = new Mpdf(['tempDir' => $tempDir]);

$mpdf->Bookmark('Start of the document');
$mpdf->WriteHTML('<div>Hello, world!</div>');

$mpdf->Output(dirname(__DIR__) . "/hello_world.pdf");

//Server API 	Apache 2.0 Handler 
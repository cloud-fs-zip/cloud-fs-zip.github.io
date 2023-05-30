<?php
// https://www.php.net/manual/en/class.opensslcertificate.php
// https://www.php.net/manual/en/class.opensslasymmetrickey.php

// $data and $signature are assumed to contain the data and the signature

// fetch public key from certificate and ready it
// $rootDir = realpath($_SERVER["DOCUMENT_ROOT"]); include "$rootDir/yourfile.php";

$pubkeyid = openssl_pkey_get_public(dirname(__FILE__).'/cert.pem');

// state whether signature is okay or not
$ok = openssl_verify($data, $signature, $pubkeyid);
if ($ok == 1) {
    echo "good";
} elseif ($ok == 0) {
    echo "bad";
} else {
    echo "ugly, error checking signature";
}
// free the key from memory
openssl_free_key($pubkeyid);
?>
Example #2 openssl_verify() example

<?php
//data you want to sign
$data = 'my data';

//create new private and public key
$private_key_res = openssl_pkey_new(array(
    "private_key_bits" => 2048,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
));
$details = openssl_pkey_get_details($private_key_res);
$public_key_res = openssl_pkey_get_public($details['key']);

//create signature
openssl_sign($data, $signature, $private_key_res, "sha256WithRSAEncryption");

//verify signature
$ok = openssl_verify($data, $signature, $public_key_res, OPENSSL_ALGO_SHA256);
if ($ok == 1) {
    echo "valid";
} elseif ($ok == 0) {
    echo "invalid";
} else {
    echo "error: ".openssl_error_string();
}
?>
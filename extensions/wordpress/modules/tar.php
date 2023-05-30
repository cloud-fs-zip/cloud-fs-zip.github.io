<?php
try {
    $phar = new PharData('myphar.tar');
    $phar->extractTo('/full/path'); // extract all files
} catch (Exception $e) {
    // handle errors
}

// decompress from gz
$p = new PharData('/path/to/my.tar.gz');
$p->decompress(); // creates /path/to/my.tar

// unarchive from the tar
$phar = new PharData('/path/to/my.tar');
$phar->extractTo('/full/path');
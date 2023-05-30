<?php
// create new Phar
$phar = new Phar('lemon.phar');
$phar->startBuffering();
$phar->addFromString('test.txt', 'text');
$phar->setStub('<?php __HALT_COMPILER(); ? >');

// add object of any class as meta data
class AnyClass {}
$object = new AnyClass;
$object->data = 'Chunk';
$phar->setMetadata($object);
$phar->stopBuffering();
?>

and read it by:
<?php
class AnyClass {
    function __destruct() {
        echo $this->data;
    }
}
// output: Chanh
file_get_contents('phar://test.phar');
?>
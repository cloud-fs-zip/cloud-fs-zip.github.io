# Integrity is a big importent concept
the tar format is a rollup format to store only file propertys 
so we add to every tar archive that we create a additional integrity.txt which 
stores the integrity hashes delimited by line <pre>\n</pre>

to verify the integrity you simply extract the archives integrity.txt it is mostly on top of the file
as the tar format is block 512byte block based the data is aligned and can easy get striped if your using
the nativ opfs format then you got a byteSize Property which you can use as replacement for the alignment when parsing.

<pre>
{ byteSize: 8, name === 'integrity.text' }
{ tarHeader.dataEndPosition, name === 'integrity.txt' }

</pre>
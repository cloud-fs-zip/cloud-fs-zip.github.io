# The Private Origin Concepts
a origin it self is the .origin property of a URL Object 
it looks like protocol://domain.tld:port it is uniq to the current instance
and its used workdirectory as also the profile directory

this is importent background knowleg when it comes to Application Packaging
internal under the hood.

in general you control the origin in 2 main services DNS/HTTPS then additional
services for other parts of the origin or sub origins on other protocol port pairs.
but sharing the same domain reference. and True DNS is not even needed if you directly
work with IPS. protocol://ip.x.x.x is also a valid origin. But the domain dns concept
is a nice scale able decoupled legacy way to scale servers. 

If you depend on the cloud-fs.zip concepts then you will have no scaling or dns 
issues at all as it uses HTTPS only as entrypoint into the cloud-fs.zip Router
which works via webRTC so directly in your own browser without additional logic
executed on our server or origin you only get the inital router firmware deployed
the rest is up to your applications.

you also get auto updates for the router as also all your users if you choose
to not deploy your own mirror or clone of the cloud-fs.zip stack.

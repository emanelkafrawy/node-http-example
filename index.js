const http = require('http');
const fs = require('fs'); //file system
const path = require('path');

const hostname = 'localhost';
const port = 2000;


//set up the server
const server = http.createServer((req, res ) => {
    
    console.log("request for " + req.url + 'by method ' + req.method);

  /*  res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, world ...</h1></body></html>');
*/

    if(req.method =='GET') {
        
        let fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        let filePath = path.resolve('./public' + fileUrl); //عشان يدخلني جوا الفيل بتاع ببلك 
        const fileExt = path.extname(filePath)  ;  //extension name

        if(fileExt == '.html') {
            fs.exists(filePath, (exists) => {

                if(!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html'); 
                    res.end('<html><h1>Error 404:' + fileUrl + ' not found  </h1></html>');
                    return ;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html'); 
                fs.createReadStream(filePath).pipe(res);


            });//callbackfunction
        } else {

            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html'); 
            res.end('<html><h1>Error 404:' + fileUrl + ' not an html file   </h1></html>');
            return ;
        }
        
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html'); 
        res.end('<html><h1>Error 404:' + req.method + ' not supported by this node html server  </h1></html>');
        return ;
    }
});

//to start the server
server.listen(port, hostname, ()=> { //info abut the server

    console.log(`server running att http://${hostname}:${port}`);
});
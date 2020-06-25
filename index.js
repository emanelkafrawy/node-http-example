const http = require('http');

const hostname = 'localhost';
const port = 2000;


//set up the server
const server = http.createServer((req, res ) => {
    
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, world ...</h1></body></html>');

});

//to start the server
server.listen(port, hostname, ()=> { //info abut the server

    console.log(`server running att http://${hostname}:${port}`);
});
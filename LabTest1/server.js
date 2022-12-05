var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var fs = require("fs");

var bodyParser = require('body-parser');
var multer = require('multer');

//create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded ({ extended: false })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(multer({ dest: '/tmp/'}));

app.get('/index.html', function (req, res){
    res.sendFile( __dirname + "/" + "index.html");
})

app.post('file_upload' function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;


    fs.readFile( req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
           if( err ) {
              console.log( err );
              } else {
                 response = {
                    message:'File uploaded successfully',
                    filename:req.files.file.name
                 };
              }
           
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
     });
  })
  
  

// app.post('process_post', urlencodedParser, function (req, res) {
//     //prepare output in JSON format
//     response = {
//         first_name:req.body.first_name,
//         last_name:req.body.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// })

// app.get('/index.html', function (req, res){
//     // console.log("Got a GET request for the homepage");
//     // res.send(__dirname + "/" + "index.html" )
//     res.sendfile( __dirname + "/" + "index.html" )
// })

// app.get('/process_get', function (req, res){
//     //prepare output in JSON format
//     response = {
//         first_name:req.query.first_name,
//         last_name:req.query.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// })
// //this responds a POST request for the homepahe
// app.post('/', function (req, res){
//     console.log("Got a POST request for the homepage");
//     res.send('Hello POST');
// })

// //this respond a DELETE request fo tthe /del_user page.
// app.delete('/del_user', function (req, res){
//     console.log("Got a DELETE request for /del_user");
//     res.send("Hello DELETE");
// })

// //This responds a GET request for the /list_user page.
// app.get('/list_user',function (req, res) {
//     console.log("Got a GET request for /list_user");
//     res.send('Page Listing');
// })

// //This responds a GET request for abcd, abxd, ab123cd, and so on
// app.get('/ab*cd', function (req, res){
//     console.log("Got A GET request for /ab*cd");
//     res.send('Page Pattern Match');
// })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
})
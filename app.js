const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

/*////
Change this value to match your upload directory!
////*/
const uploadPath = '/home/mathieu/Lab/node_uploads/uploads/';

http.createServer(function (req, res) {
    if (req.url == '/fileUpload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldPath = files.fileToUpload.path;
            var newPath = uploadPath + files.fileToUpload.name;
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } 
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileUpload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileToUpload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(1337);
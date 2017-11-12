var fs = require('fs');
var formidable = require('formidable');


exports.css = function(request, response) {
    console.log("Czytam CSS");
    fs.readFile("css/style.css", function(err, file) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(file);
        response.end();
    });
}

exports.upload = function newImg(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        if (err) throw err;
        fileName = files.upload.name;
        fileType = files.upload.type;
        fs.renameSync(files.upload.path, fileName);

        fs.readFile('templates/upload.html', function(err, html) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        //response.write("<html><head><link rel='stylesheet' type='text/css' href='css/style.css'></head></body>");
        //response.write("<h2>Received image:</h2>");
        //response.write("<img src='/show' /><br/><br/>");
        //response.write("<a href='/'><< powrót do strony głównej</a>");
        //response.write("</body></html>");
        response.end();
        });
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(err, file) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": fileType});
        response.write(file, "binary");
        response.end();
    });
}


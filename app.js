const http = require("http");
const fs = require("fs");
const port = 3000;
var path = require("path");
// const path = require('./style.css')

const server = http.createServer(function (req, res) {
	res.writeHead(200, { "Content-Type": "text/html" });

	if (req.url === "/") {
		fs.readFile("index.html", function (error, data) {
			if (error) {
				res.writeHead(404);
				res.write("Error: File Not Found");
			} else {
				res.write(data);
			}
			res.write("Hello Node");
			res.end();
		});
	} else if (req.url.match(".css")) {
		var cssPath = path.join(__dirname, "", req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");
		res.writeHead(200, { "Content-Type": "text/css" });
		fileStream.pipe(res);
	}
});

server.listen(port, function (error) {
	if (error) {
		console.log("Something went wrong", error);
	} else {
		console.log("Server is listening on port " + port);
	}
});

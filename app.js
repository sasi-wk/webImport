var express = require('express'),
bodyParser = require('body-parser'),
multer = require('multer'),
pg = require('pg'),
dateTime = require('node-datetime'),
dt = dateTime.create(),
app = express();
port = 3000;

var fileuploader = require('./controller/fileupload')
var callAPI = require('./controller/callAPI')


/**set headers */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) { //allow cross origin requests
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET")
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
res.header("Access-Control-Allow-Credentials", true)
next()
})

/**load file upload form*/
app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html')
})

/**call fileuploader */
app.use(fileuploader)
   

app.listen(port, function () {
console.log('App start at localhost' +port+'......')
})


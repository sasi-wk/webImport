/**Import from node lib */
var express = require('express'),
bodyParser = require('body-parser'),
multer = require('multer'),
pg = require('pg'),
dateTime = require('node-datetime'),
dt = dateTime.create(),
app = express();
port = 3000,
path = require('path');

/**Import from project dir */
var fileuploader = require('./controller/fileupload')
var callAPI = require('./controller/callAPI')
var uploadPath = require('./Routes/uploadAPI')

/**View Engine*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/** Set Static Folder*/
app.use(express.static(path.join(__dirname, 'client')));

/**set headers */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) { //allow cross origin requests
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET")
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
res.header("Access-Control-Allow-Credentials", true)
next()
})

/**API Path */
app.use('/api',uploadPath);

app.listen(port, function () {
console.log('App start at localhost' +port+'......')
})


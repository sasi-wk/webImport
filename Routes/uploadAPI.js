/**Import from project */
var callAPI = require('../controller/callAPI')
var fileReader = require('../controller/fileReader');
var uploaded = require('../controller/uploadedDB');
var removeFile = require('../controller/remove')
var qs = require('./queryString')

/**Import from node library */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var multer = require('multer');
var fs = require('fs');

/**variable */
var date;
var datetimestamp;
var typeoffile = '';
var fileName = ''


/**Connect DB */
var config = {
    user: 'postgres',
    database: 'webImport',
    password: 'postgres',
    port: 5432,
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var connect = "postgres://postgres:postgres@localhost/webImport";
var pool = new pg.Pool(config);


/**set folder for file upload*/
var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        typeoffile = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        fileName = file.fieldname + '-' + datetimestamp
        cb(null, fileName + typeoffile);
    }
})

/**call multer*/
var upload = multer({
    //multer settings
    storage: storage
}).single('selectFile')

/**API for select upload information */
router.get('/uploaded', function (req, res, next) {
    var results = []
    pool.connect(async function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const query = await client.query(qs)
        for (let i = 0; i < query.rows.length; i++) {
            results.push(query.rows[i])
            //console.log( results)
            done()

        }
        res.send(results);
    })
});


/** API path that will upload the files */
router.post('/upload', function (req, res, next) {
    date = new Date();
    datetimestamp = Date.now();
    /**Request token from PHIE API(http://192.168.1.140:8180/phie/rest/user/token/) */
    callAPI.getToken().then(token => {
        console.log(token)
        callAPI.login(token).then(statusCode => {
            let Token = token
            console.log('status code: ' + statusCode)
            callAPI.getUserInfo(Token).then(userid => {
                console.log('user id: ' + userid)
                upload(req, res, function (err) {
                    console.log(req.selectFile)
                    if (typeoffile !== ".zip" || err) {
                        console.log(err)
                        res.send('only file zip'+err)
                        console.log("only zip file")
                        uploaded.uploadInfo({
                            uploader: userid,
                            datetimestamp: datetimestamp,
                            filename: req.file.filename,
                            err_msg: err
                        })//uploaded.uploadInfo


                    } else {
                        uploaded.uploadInfo({
                            uploader: userid,
                            datetimestamp: date,
                            filename: req.file.filename,
                            err_msg: 'upload success'
                        })//uploaded.uploadInfo
                        /**call unzip function and read file */
                        fileReader.fileReader({
                            filenamePath: fileName,
                            inputPath: './uploads/' + req.file.filename,
                            typeoffile: typeoffile,
                            callback: function (ServiceDelegate) {
                                callAPI.sendDataset({
                                    ServiceDelegate: ServiceDelegate,
                                    uploaded: date
                                })
                            }
                        })

                        res.json({ status: 'upload success', filename: req.file.filename })
                    }
                    /**Remove file in uploads directory */
                    var rmpath = './outputs/' + fileName + typeoffile
                    console.log(rmpath)
                    removeFile.removeInputFile(rmpath)
                })//upload
            })//callAPI.getUserInfo
        })//callAPI.login
    })//callAPI.getToken()   
})

module.exports = router;




var callAPI = require('./callAPI')
var fileReader = require('./fileReader');
var uploaded = require('./uploadedDB');
var removeFile = require('./remove')
var express = require('express');
var fileuploader = express();

var multer = require('multer');
var fs = require('fs');
var date = new Date();
var datetimestamp = Date.now();
var typeoffile = '';
var fileName = ''

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
}).single('file')

/** API path that will upload the files */
fileuploader.post('/upload', function (req, res) {
    /**Request token from PHIE API(http://192.168.1.140:8180/phie/rest/user/token/) */
    callAPI.getToken().then(token => {
        console.log(token)
        callAPI.login(token).then(statusCode => {
            let Token = token
            console.log('status code: ' + statusCode)
            callAPI.getUserInfo(Token).then(userid => {
                console.log('user id: ' + userid)
                upload(req, res, function (err) {
                    console.log(req.file)
                    if (typeoffile !== ".zip" || err) {
                        console.log(err)
                        res.send('only file zip')
                        console.log("only zip file")
                        uploaded.uploadInfo({
                            uploader: userid,
                            datetimestamp:datetimestamp,
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
                                    ServiceDelegate:ServiceDelegate,
                                    uploaded:date
                                })
                            }
                        })
                        
                        res.json({ status: 'upload success', filename: req.file.filename })
                    }
                    /**Remove file in uploads directory */
                    var rmpath = './outputs/' +fileName+typeoffile
                    console.log(rmpath)
                    removeFile.removeInputFile(rmpath)
                })//upload
            })//callAPI.getUserInfo
        })//callAPI.login
    })//callAPI.getToken()   
})//.post

module.exports = fileuploader

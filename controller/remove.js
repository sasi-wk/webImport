var rmdir = require('rmdir')

module.exports = {
    removeInputFile : function(path){
        rmdir(path, function (err, dirs, files) {
        console.log('all files are removed');
          });
    }
}

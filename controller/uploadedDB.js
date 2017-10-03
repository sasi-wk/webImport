var pg = require('pg'),
    dateTime = require('node-datetime'),
    dt = dateTime.create();

formattimes = dt.format('Y-m-d H:M:S');
var config = {
    user: 'postgres',
    database: 'webImport',
    password: 'postgres',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var connect = "postgres://postgres:postgres@localhost/webImport";
var pool = new pg.Pool(config);


module.exports = {
    uploadInfo: function (options) {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("not able to get connection: " + err);
            }
            client.query('INSERT INTO uploaded(uploader,uploaded,filename,err_msg) VALUES($1,$2,$3,$4)',
                [options.uploader, options.datetimestamp, options.filename, options.err_msg]);
            done()
        })
    },
    serviceSent:function(options){
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("not able to get connection: " + err);
            }
            client.query('INSERT INTO service_sent(uploaded,ref,err_msg) VALUES($1,$2,$3)',
                [options.uploaded, options.ref, options.err_msg]);
            done()
        })
    }
}
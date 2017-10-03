var axios = require('axios');
var uploadedDB = require('./uploadedDB');
var userid = ''
var token = ''
module.exports = {
    getToken: async function () {
        let response = await axios.get('http://192.168.1.140:8180/phie/rest/user/token/')
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        token = response.data
        return token
    },
    login: async function (token) {
        let url = "http://192.168.1.140:8180/phie/rest/user/login?token=" + token
        console.log(url)
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                username: 14966,
                password: ''
            }
        }
        let response = await axios(url, config)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    //console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
               // console.log(error.config);
            })
        return response.status
    },
    getUserInfo: async function (token) {

        let response = await axios.get('http://192.168.1.140:8180/phie/rest/user?token=' + token)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        userid = response.data.id
        return userid
    },
    sendDataset: function (options) {
        let url = "http://192.168.1.140:8180/phie/rest/exchange/?token=" + token
        //console.log(url)
        let config = {
            headers: { 'Content-Type': 'application/json' },
        }
        axios.put(url,options.ServiceDelegate, config)
            .then(function (response) {
                console.log('status send:ok')
                uploadedDB.serviceSent({
                    uploaded:options.uploaded,
                    ref: {
                        hcode:options.ServiceDelegate.patient[0].hcode,
                        hn:options.ServiceDelegate.patient[0].hn,
                        vn:options.ServiceDelegate.vn
                    },
                    
                })
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.data&&error.response.data.id!=undefined){
                        uploadedDB.serviceSent({
                            uploaded: options.uploaded,
                            ref: {
                                hcode:options.ServiceDelegate.patient[0].hcode,
                                hn:options.ServiceDelegate.patient[0].hn,
                                vn:options.ServiceDelegate.vn
                            },
                            err_msg:error.response.data.id+': '+error.response.data.msg
                        })
                        console.log(options.ServiceDelegate.patient[0].hcode+':'+options.ServiceDelegate.patient[0].hn+':'+options.ServiceDelegate.vn);
                        console.log(error.response.data);
                    }
                    else{
                        uploadedDB.serviceSent({
                            uploaded: options.uploaded,
                            ref: {
                                hcode:options.ServiceDelegate.patient[0].hcode,
                                hn:options.ServiceDelegate.patient[0].hn,
                                vn:options.ServiceDelegate.vn
                            },
                            err_msg:error.response.status+' : '+error.response.statusText
                        })
                        console.log('err code'+error.response.status);
                        console.log('err txt'+error.response.statusText);
                        console.log(error.response.headers);
                    }   
                } else if (error.request) {
                    uploadedDB.serviceSent({
                        uploaded:options.uploaded,
                        ref: {
                            hcode:options.ServiceDelegate.patient[0].hcode,
                            hn:options.ServiceDelegate.patient[0].hn,
                            vn:options.ServiceDelegate.vn
                        },
                        err_msg:'error.request'
                    })
                    console.log(error.request);

                } else {
                    uploadedDB.serviceSent({
                        uploaded:options.uploaded,
                        ref: {
                            hcode:options.ServiceDelegate.patient[0].hcode,
                            hn:options.ServiceDelegate.patient[0].hn,
                            vn:options.ServiceDelegate.vn
                        },
                        err_msg:'Error: '+error.message
                    })
                    console.log('Error', error.message);
                }
                //console.log(error.config);
            })

    }
}







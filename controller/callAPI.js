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
    sendDataset: function (list) {
        let url = "http://192.168.1.140:8180/phie/rest/exchange/?token=" + token
        //console.log(url)
        let config = {
            headers: { 'Content-Type': 'application/json' },
        }
        axios.put(url, JSON.stringify(list), config)
            .then(function (response) {
                console.log('status send:ok')
                uploadedDB.serviceSent({
                    uploader: userid,
                    ref: {
                        hcode:list.checkup[0].hcode,
                        hn:list.patient[0].hn,
                        vn:list.vn
                    },
                    err_msg: ''
                })
            })
            .catch(function (error) {
                if (error.response) {
                    uploadedDB.serviceSent({
                        uploader: userid,
                        ref: {
                            hcode:list.checkup[0].hcode,
                            hn:list.patient[0].hn,
                            vn:list.vn
                        },
                        err_msg:error.response.data.msg
                    })
                    console.log(error.response.data.msg);
                    console.log(error.response.status);
                    console.log(error.response.statusText);
                    //console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                //console.log(error.config);
            })

    }
}







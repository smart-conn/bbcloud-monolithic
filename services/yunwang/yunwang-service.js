TopClient = require('./topClient').TopClient;
var nconf = require('nconf');
var YunWang = {};

YunWang._client = new TopClient({
    'appkey': nconf.get('yunwang:appkey'),
    'appsecret': nconf.get('yunwang:appsecret'),
    'REST_URL': nconf.get('yunwang:REST_URL')
});

YunWang.addCustomer = function (userId,password){
    YunWang._client.execute('taobao.openim.users.add', {
        'userinfos':{
            userid:userId,
            password:password
        }
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    })};

YunWang.getCustomer = function(userId){
    YunWang._client.execute('taobao.openim.users.get', {
        'userids':userId
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    })
};

YunWang.delCustomer = function(userId){
    YunWang._client.execute('taobao.openim.users.delete', {
        'userids':userId
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    })
};

YunWang.updateCustomerPasswd = function(userId,password){
    YunWang._client.execute('taobao.openim.users.update', {
        'userinfos':{
            userid:userId,
            password:password
        }
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    })
};


module.exports = YunWang;
var WeChat = require('wechat');
var nconf = require('nconf');
var router = require('express').Router();
var Customer = require('../models/customer-account');
var YunWang = require('../services/yunwang/yunwang-service');


var config = {
    token: nconf.get('wechat:token'),
    appid: nconf.get('wechat:appId'),
    encodingAESKey: nconf.get('wechat:encodingAESKey')
};

router.post('/wechat', WeChat(config, message));

function message(req, res, next) {
    var message = req.weixin;
    if (message.MsgType == 'device_event') {
        if (message.Event == 'bind') {
            saveBindRelationship(message);
            res.send('congratulations! bind succesee!')
        } else if (message.Event == 'unbind') {
            removeBindRelationship(message);
            res.send('thanks for using our products!see you!')
        }
    }
}
function saveBindRelationship(message) {
    var wechatOpenId = message.OpenID;
    Customer.findOne({wechatOpenId: wechatOpenId}, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (!result) {
            var customer = new Customer();
            customer.wechatOpenId = message.OpenID;
            customer.deviceIds = [];
            customer.deviceIds.push(message.DeviceID);
            customer.name = message.FromUserName;
            customer.save(function (err) {
                if (err) {
                    return console.log(err);
                }
                YunWang.addCustomer(message.OpenID,message.OpenID);//TODO 制定规则后要修改账号密码
            });
        } else {
            if (!result.deviceIds || result.deviceIds.indexOf(message.DeviceID) == -1) {
                result.deviceIds.push(message.DeviceID);
                Customer.update({wechatOpenId: wechatOpenId}, {deviceIds: result.deviceIds}, {}, function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        console.log('save done!')
                    }
                });
            }
        }
    });
}

function removeBindRelationship(message) {
    var wechatOpenId = message.OpenID;
    Customer.findOne({wechatOpenId: wechatOpenId}, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result && result.deviceIds.indexOf(message.DeviceID) != -1) {
            result.deviceIds.splice(result.deviceIds.indexOf(message.DeviceID), 1);
            Customer.update({wechatOpenId: wechatOpenId}, {deviceIds: result.deviceIds}, {}, function (err, result) {
                if (err) {
                    return console.log(err);
                }
            })
        }
    });
}
module.exports = router;
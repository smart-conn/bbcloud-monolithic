var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  // _id	ObjectId	设备唯一id，自动生成	pk
  serialNumber:String,
  // {
  //   type: String,
  //   required: true,
  //   trim: true
  // },  //设备生产的序列号	unique
  macAddress:String,  //设备的 MAC 地址	unique
  name:String,  //设备型号 id	fk: DeviceModel
  bbcloudDeviceId:String,  //bbcloud 的设备 id，由规则生成	unique, index
  wechatDeviceId:String,  //微信硬件平台分配的设备 id	unique
  wechatDeviceQrticket:String,  //设备二维码生产串
  wechatDeviceLicence:String, //产品使用直连SDK时返回的设备证书
  aliyunDeviceId:String,  //阿里云 IoT 服务分配的设备 id	unique
  aliyunDeviceSecret:String,
  activatedAt:Date,  //激活时间。为空代表未激活
  ownerCustomerId:String,  //机主 id。指向 CustomerAccount
  familyGroupId:String,  //家庭组Id
  lastLoginIp:String,  //最近访问 bbcloud 的 ip
  lastLoginAt:Date,  //最近访问 bbcloud 的时间
  manufacturerId:String  //厂商Id ,指向 Manufacturer
});


deviceSchema.pre('findById',function (next) {
  console.log('hello cjj,findById');
  next()
})

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;

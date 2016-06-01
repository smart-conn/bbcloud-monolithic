var router = require('express').Router();

var CustomerService = require('../services/account/customer-service');
var AdministratorService = require('../services/account/administrator-service');
var ManufacturerService = require('../services/account/manufacturer-service');

var customerService = new CustomerService();
var administractorService = new AdministratorService();
var manufacturerService = new ManufacturerService();

router.use(customerService.createMiddleware());
router.use(administractorService.createMiddleware());
router.use(manufacturerService.createMiddleware());

module.exports = router;

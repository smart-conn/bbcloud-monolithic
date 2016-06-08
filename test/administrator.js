'use strict';
const request = require('request');
const expect = require('chai').expect;
const url = require('url');

const baseUrl = 'http://127.0.0.1:3000';
const Authorization = "Bearer ";
const name = 'admin';
const password = "admin";
const newPwd = "newpassword";

let token = "";

describe('管理员账户测试', () => {    
    it('登陆测试', done => {
        let option = {
            url: url.resolve(baseUrl, "/administrator/auth/login"),
            body: {
                name: name,
                password: password
            },
            json: true
        };

        request.post(option, (err, res, body) => {
            token = body.token;
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(token.split('.').length).to.be.equal(3);
            done();
        });
    });

});
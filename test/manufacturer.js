'use strict';
const request = require('request');
const expect = require('chai').expect;
const url = require('url');

const baseUrl = 'http://127.0.0.1:3000';
const Authorization = "Bearer ";
const email = 'tosone@qq.com';
const password = "password";
const newPwd = "newpassword";

let token = "";
let emailToken = "";

describe('厂家账户测试', () => {
    it('注册用户', done => {
        let option = {
            url: url.resolve(baseUrl, "/manufacturer/auth/signup"),
            body: {
                email: email,
                password: password
            },
            json: true
        };
        request.post(option, (err, res, body) => {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(body.code).to.be.equal(200);
            done();
        });
    });

    it('登陆测试', done => {
        let option = {
            url: url.resolve(baseUrl, "/manufacturer/auth/login"),
            body: {
                email: email,
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

    describe('邮件找回密码', () => {
        let option = {
            url: url.resolve(baseUrl, "/auth/manufacturer/resetPwd"),
            headers: {
                "Authorization": ""
            },
            body: {
                email: email
            },
            json: true
        }

        it('错误的邮箱格式', done => {
            option.body.email = 'a@b.c';
            option.headers.Authorization = Authorization + token;
            request.post(option, (err, res, body) => {
                expect(err).to.be.equal(null);
                expect(res.statusCode).to.be.equal(200);
                expect(body.code).to.be.equal(500);
                expect(body.msg).to.be.equal('Not a vaild email.');
                done();
            });
        });

        it('错误的邮箱', done => {
            option.body.email = 'a@b.com';
            option.headers.Authorization = Authorization + token;
            request.post(option, (err, res, body) => {
                expect(err).to.be.equal(null);
                expect(res.statusCode).to.be.equal(200);
                expect(body.code).to.be.equal(500);
                expect(body.msg).to.be.equal('This email has not been registered.');
                done();
            });
        });

        it('正确的邮箱', done => {
            option.body.email = email;
            option.headers.Authorization = Authorization + token;
            request.post(option, (err, res, body) => {
                emailToken = body.token;
                expect(err).to.be.equal(null);
                expect(res.statusCode).to.be.equal(200);
                expect(body.code).to.be.equal(200);
                done();
            });
        });

        it('频繁利用邮件找回密码', done => {
            option.body.email = email;
            option.headers.Authorization = Authorization + token;
            request.post(option, (err, res, body) => {
                expect(err).to.be.equal(null);
                expect(res.statusCode).to.be.equal(200);
                expect(body.code).to.be.equal(500);
                expect(body.msg).to.be.equal('Please wait for a moment to send another email.');
                done();
            });
        });
        describe('重设密码', () => {
            let option = {
                url: url.resolve(baseUrl, "/auth/manufacturer/setPwd"),
                body: {
                    password: newPwd
                },
                json: true
            }

            it('利用错误Token设置密码', done => {
                option.body.token = "wrong token";
                request.post(option, (err, res, body) => {
                    expect(err).to.be.equal(null);
                    expect(res.statusCode).to.be.equal(200);
                    expect(body.code).to.be.equal(500);
                    done();
                });
            });

            it('设置密码', done => {
                option.body.token = emailToken;
                request.post(option, (err, res, body) => {
                    expect(err).to.be.equal(null);
                    expect(res.statusCode).to.be.equal(200);
                    expect(body.code).to.be.equal(200);
                    done();
                });
            });
            it('重复利用Token设置密码', done => {
                option.body.token = emailToken;
                request.post(option, (err, res, body) => {
                    expect(err).to.be.equal(null);
                    expect(res.statusCode).to.be.equal(200);
                    expect(body.code).to.be.equal(500);
                    expect(body.msg).to.be.equal('Not a valid token.');
                    done();
                });
            });

            it('新密码登陆', done => {
                let option = {
                    url: url.resolve(baseUrl, "/manufacturer/auth/login"),
                    body: {
                        email: email,
                        password: newPwd
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
    });
});
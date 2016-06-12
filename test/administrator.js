'use strict';
const request = require('request');
const expect = require('chai').expect;
const url = require('url');
const _ = require('lodash');

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

    describe('修改权限后Token失效', () => {
        let _url = "";
        let roleId = "";

        it('修改权限', done => {
            request.get({
                url: url.resolve(baseUrl, '/api/administrator-accounts?_page=1&_perPage=30&_sortDir=DESC&_sortField=id'),
                headers: {
                    Authorization: Authorization + token
                }
            }, (err, res, body) => {
                roleId = _.head(JSON.parse(body)).role;
                _url = `/api/roles/${roleId}`;

                request.put({
                    url: url.resolve(baseUrl, _url),
                    headers: {
                        Authorization: Authorization + token
                    },
                    body: {
                        id: roleId,
                        name: "超级管理员",
                        permissions: []
                    },
                    json: true
                }, (err, res, body) => {
                    expect(err).to.be.equal(null);
                    expect(res.statusCode).to.be.equal(200);
                    expect(body).to.have.property('name');
                    done();
                });
            });
        });

        it('Token失效', done => {
            request.get({
                url: url.resolve(baseUrl, _url),
                headers: {
                    Authorization: Authorization + token
                },
            }, (err, res, body) => {
                expect(err).to.be.equal(null);
                expect(res.statusCode).to.be.equal(401);
                expect(body.indexOf('UnauthorizedError')).to.be.equal(0);
                done();
            });
        });
    });

});
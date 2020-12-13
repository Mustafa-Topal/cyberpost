//process.env.NODE_ENV = 'test';

import app from '../index';
import mongoose from 'mongoose';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Testing authorization', function() { // this is no lamda, because this.timeout wouldn't work. 
    this.timeout(15000);

    before(function (done) {   
        mongoose.connect('mongodb://localhost:27017/cyberpost', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            })    
        })
    })

    describe('Register', () => {
        it('Yeni bir kullanıcı oluştur', (done) => {
            let user = {
                "username": "YeniKullanici",
                "email": "mustafa.yenikullanici@gmail.com",
                "password": "123456"
            }
            chai.request(app.server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                })
        });
    });

    describe('Register', () => {
        it('Kullanıcı varsa hata ver', (done) => {
            let user = {
                "username": "YeniKullanici",
                "email": "mustafa.yenikullanici@gmail.com",
                "password": "123456"
            }
            chai.request(app.server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('fail');
                    done();
                })
        });
    });

    describe('Login', () => {
        it('Eğer kullanıcı varsa giriş yap', (done) => {
            let user = {
                "username": "YeniKullanici",
                "email": "mustafa.yenikullanici@gmail.com",
                "password": "123456"
            }
            chai.request(app.server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                })
        });
    });

    describe('Login', () => {
        it('Kullanıcı bilgilerinden biri yanlışsa hata ver', (done) => {
            let user = {
                "username": "YeniKullanici",
                "email": "yanlis.email@gmail.com",
                "password": "wrongpass"
            }
            chai.request(app.server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('fail');
                    done();
                })
        });
    });

    describe('Login', () => {
        it('Eğer şifre yanlışsa hata ver', (done) => {
            let user = {
                "username": "YeniKullanici",
                "email": "mustafa.yenikullanici@gmail.com",
                "password": "Wrongpass"
            }
            chai.request(app.server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('fail');
                    done();
                })
        });
    });

    describe('Login', () => {
        it('Kullanıcı adı yanlışsa hata ver', (done) => {
            let user = {
                "username": "YanlısKdullaniciAdi",
                "email": "mustafa.yenikullanici@gmail.com",
                "password": "123456"
            }
            chai.request(app.server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('fail');
                    done();
                })
        });
    });
});
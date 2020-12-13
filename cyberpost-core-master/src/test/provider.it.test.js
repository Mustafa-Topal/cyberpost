process.env.NODE_ENV = 'test';

import app from '../index';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Testing poviders', function() { // this is no lamda, because this.timeout wouldn't work. 
    this.timeout(15000);

    describe('Mailgun', () => {
        it('it should not POST a cyberpost without pages field', (done) => {
            let mail = {
                "from": "Muhittin Balaban <mustafa.topal.gs.05@gmail.com>",
                "to": "Abdurrahman Cabber Bin Ali <mustafa.topal@altpro.com.tr>",
                "bcc": ["Osman Aga <selal@l0real.net>", "Ninja Seyfettin <hekkehidre@etoic.com>"],
                "subject": "TEST Mailgun",
                "text": "This is the Mailgun test message.",
                "html": "<h3>Dear passenger 1, welcome to Mailgun!</h3><br />May the delivery force be with you!"
            }
            chai.request(app.server)
                .post('/api/send/mailgun')
                .send(mail)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                })
        });
    });

    describe('Mailjet', () => {
        it('it should not POST a cyberpost without pages field', (done) => {
            let mail = {
                "from": "Muhittin Balaban <mustafa.topal.gs.05@gmail.com>",
                "to": "Abdurrahman Cabber Bin Ali <mustafa.topal@altpro.com.tr>",
                "bcc": ["Osman Aga <selal@l0real.net>", "Ninja Seyfettin <hekkehidre@etoic.com>"],
                "subject": "TEST Mailjet",
                "text": "This is the Mailjet test message. + mailjetbcc",
                "html": "<h3>Dear passenger 1, welcome to Mailjet!</h3><br />May the delivery force be with you!"
            }
            chai.request(app.server)
                .post('/api/send/mailjet')
                .send(mail)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                })
        });
    });

    describe('Sendgrid', () => {
        it('it should not POST a cyberpost without pages field', (done) => {
            let mail = {
                "from": "Muhittin Balaban <mustafa.topal.gs.05@gmail.com>",
                "to": "Abdurrahman Cabber Bin Ali <mustafa.topal@altpro.com.tr>",
                "bcc": ["Osman Aga <selal@l0real.net>", "Ninja Seyfettin <hekkehidre@etoic.com>"],
                "subject": "TEST Sendgrid",
                "text": "This is the Sendgrid test message. + bcc",
                "html": "<h3>Dear passenger 1, welcome to Sendgrid!</h3><br />May the delivery force be with you!"
            }
            chai.request(app.server)
                .post('/api/send/sendgrid')
                .send(mail)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                })
                
        });
    });
});
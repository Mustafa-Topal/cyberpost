import providerSecrets from '../../provider-secrets.json';
const axios = require('axios');

let publicKey = providerSecrets['mailjet']['publicKey'];
let privateKey = providerSecrets['mailjet']['privateKey'];

var Mailjet = require('node-mailjet').connect(publicKey, privateKey);

const regExp = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/;

export default {
    convertMail: (mail) => {
        // 1. If cc/to is string, convert to array
        if (mail.to && typeof mail.to === 'string') {
            mail.to = mail.to.split(',').map(item => item.trim());
        };

        if (mail.cc && typeof mail.cc === 'string') {
            mail.cc = mail.cc.split(',').map(item => item.trim());
        };

        if (mail.bcc && typeof mail.bcc === 'string') {
            mail.bcc = mail.bcc.split(',').map(item => item.trim());
        };

        // 2. Convert these array values to mailjet recipients objects
        if (mail.to) {
            if (mail.cc)
                var toAndCc = mail.to.concat(mail.cc); 
            else
                var toAndCc = mail.to
        }
        
        let mailTo = []; 
        let mailBcc = [];

        toAndCc.forEach(element => { 
            // mail.to RegExp
            let regToText = regExp.exec(element);
            let regToName = regToText[1];
            let regToEmail = regToText[2];
            mailTo.push( 
                {
                    "Email": regToEmail,
                    "Name": regToName
                },
            );
        });

        if (mail.bcc) {
            mail.bcc.forEach(element => { 
                // mail.bcc RegExp
                let regBccText = regExp.exec(element);
                let regBccName = regBccText[1];
                let regBccEmail = regBccText[2];
                mailBcc.push( 
                    {
                        "Email": regBccEmail,
                        "Name": regBccName,
                    },
                );
            });
        };
        // mail.from RegExp
        let regFromText = regExp.exec(mail.from);
        let regFromName = regFromText[1];
        let regFromEmail = regFromText[2];

        var newMail = {
            "Messages": [
                {
                    "From": {
                        "Email": regFromEmail,
                        "Name": regFromName,
                    },
                    "Subject": mail.subject,
                    "To": mailTo,
                    "Bcc": mailBcc,
                    "TextPart": mail.text,
                    "HTMLPart": mail.html
                }
            ]
        }
        return newMail;
    },

    sendMail: (mail, success, fail) => {
        var sendEmail = Mailjet.post('send', { version: 'v3.1' });

        sendEmail
            .request(mail)
            .then((result) => success(result.body))
            .catch((err) => fail(err));
    }
}
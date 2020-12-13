import mailgunjs from 'mailgun-js'; // site= https://mailgun.com/app/domains
import providerSecrets from '../../provider-secrets.json';

let api_key = providerSecrets['mailgun']['api-key']; // <----HERE PASTE YOUR API KEY|
let DOMAIN = providerSecrets['mailgun']['domain']; // <----ENTER YOUR DOMAIN|

let mailgun = mailgunjs({ apiKey: api_key, domain: DOMAIN });

export default {
    // Convertion
    convertMail: (mail) => {
        // 1. If cc/to is string, convert to array
        if (mail.to && typeof mail.to === 'string') {
            mail.to = mail.to.split(',').map(item => item.trim());
        }

        if (mail.cc && typeof mail.cc === 'string') {
            mail.cc = mail.cc.split(',').map(item => item.trim());
        }

        if (mail.bcc && typeof mail.bcc === 'string') {
            mail.bcc = mail.bcc.split(',').map(item => item.trim());
        }

        mail.to = mail.to.concat(mail.cc);

        var newMail = {
            from: mail.from,
            to: mail.to,
            bcc: mail.bcc,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        }
        if (newMail.bcc == null){
            delete newMail.bcc;
        }
        return newMail;
    },

    sendMail: (mail, success, fail) => {
        mailgun.messages().send(mail, (error, body) => {
            if (error) fail({ error, body });
            else success();
        })
    }
}
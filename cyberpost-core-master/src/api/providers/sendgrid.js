import sgMail from '@sendgrid/mail';
import providerSecrets from '../../provider-secrets.json';

const apiKey = providerSecrets['sendgrid']['apiKey'];

export default {
    
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
            name: mail.name,
            to: mail.to,
            bcc: mail.bcc,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        }
        return newMail;
    },

    sendMail: (mail, success, fail) => {
        sgMail.setApiKey(apiKey);
        sgMail.send(mail)
        .then(() => {
            success();
        })
        .catch(error => {
            fail(error);
        });
    },
};
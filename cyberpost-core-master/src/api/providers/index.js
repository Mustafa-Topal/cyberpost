import providerSendgrid from './sendgrid';
import providerMailgun from './mailgun';
import providerMailjet from './mailjet';

const providerList = {
    sendgrid: providerSendgrid,
    mailgun: providerMailgun,
    mailjet: providerMailjet
}

export default providerList;
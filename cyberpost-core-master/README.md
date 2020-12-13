CyberPost - Core
==================================

This project has been develped...  

Contents
--------
 ### API:
- Mailgun
- Mailjet
- Sendgrid
```
 Json schema, Providers, Converters, Test
```
## Getting started

First of all, you need to create a `provider-secrets.json` file in the `src` folder, to connect to the providers api's.

Here is an example of the config file:
==================================
```json
{
    "mailgun": {
        "api-key": "<HERE PASTE YOUR API KEY>",
        "domain": "<ENTER YOUR DOMAIN>"
    },
    "<OTHER_PROVIDER>": {
        "SECRETS": "<..........>",
        ".......": ""
    }
}
```
 ### REGISTER
 ![alt-text](https://media.giphy.com/media/2UCvcmhw38tsHBzQJr/giphy.webp#4-grid1)

 ### SEND EMAİL
 ![alt-text](https://media.giphy.com/media/65L9B5HQ3cTCS4nvE2/giphy.webp#0-grid1)

License
-------

MIT


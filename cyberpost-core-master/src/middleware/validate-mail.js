import Ajv from 'ajv';

var ajv = new Ajv({ allErrors: true });

var regexp = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/;
ajv.addFormat('nameEmail', regexp);

export default function (req, res, next) {

    if (!req.path.startsWith('/api/send')) {
        next();
        return;
    }

    var schema = {
        "title": "Mail",
        "description": "Mail check",
        "type": "object",
        "properties": {
            "from": { "type": "string", "maxLength": 128, "format": "nameEmail" },// "Mustafa Topal <mustafa.topal@altpro.com.tr>",
            "to": { "type": ["string", "array"], "format": "nameEmail" },// "hello@example.com",
            "cc": { "type": ["string", "array"], "format": "nameEmail" },// "hello2@example.com",
            "bcc": { "type": ["string", "array"], "format": "nameEmail" },// "helloBCC@example.com",
            "subject": { "type": "string", "maxLength": 128 },// "My great mail",
            "text": { "type": ["string", "array"], "minLength": 2 },// "Lorem ipsum..."
            "html": { "type": ["string", "array"] }
        },
        "anyOf": [ 
            {"required":["html"]},
            {"required":["text"]} 
          ],
        "required": ["from", "to", "subject"],
    }

    var valid = ajv.validate(schema, req.body);
    if (!valid) {
        res.send(ajv.errors);
        res.end();
    } else {
        next();
    }
}
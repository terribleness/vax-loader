

const xml = require('xml')
const xml2js = require('xml2js');

module.exports = initXml = (Vax) => {
    Vax.$xml = xml;

    /**
     * parse xml to json tree
     */
    Vax.prototype.xmlParse = (me, source) => {

        const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });   //xml -> json
        parser.parseString(source, (err, result) => {
            me._json = result
        });
    }
}
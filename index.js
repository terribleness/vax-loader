const Vax = require('./src/vax')

module.exports = function (source, map) {
    const vax = new Vax(source);
    return `export default ${vax.code} `;
}


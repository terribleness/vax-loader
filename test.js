

const fs = require('fs');

const Vax = require('./src/vax')

fs.readFile('./2.vax.xml', 'utf-8', function (err, source) {
    let vax = new Vax(source);
    console.log(vax.code);
});


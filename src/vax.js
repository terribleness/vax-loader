
const warn = require('./utils')
const initMixin = require('./mixin')
const initXml = require('./xml')
const initAxios = require('./axios')
const initCache = require('./cache')
const initVuex = require('./vuex')
const initHook = require('./hook');

function Vax(source) {
    if (!(this instanceof Vax)) {
        warn('Vax is a constructor and should be called with the `new` keyword')
    }
    this.code = this.init(this, source);
    // return this.init(this, source)
}

initMixin(Vax);
initHook(Vax);
initXml(Vax);
initVuex(Vax);
initAxios(Vax);
initCache(Vax);

module.exports = Vax;
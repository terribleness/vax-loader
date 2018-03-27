

module.exports = initMixin = (Vax) => {

    Vax.prototype.init = (me, source) => {
        // optimise default source
        me._source = source;

        // build xml
        me.xmlParse(me, source)

        // import hookcontroller
        me._hook = [];

        // render
        me._stackState = [];
        me._stackGetter = [];
        me._stackMutation = [];
        me._stackAction = [];
        if (me._json && me._json.vax && me._json.vax.tablet) {
            if (me._json.vax.tablet instanceof Array) {
                me._json.vax.tablet.forEach((tablet) => {
                    me.render(me, me.hook(tablet))
                })
            }
            else {
                me.render(me, me.hook(me._json.vax.tablet))
            }
        }

        // merge
        return `(function(){
                const ExpiredStorage = require('expired-storage');
                const vue = require('vue');
                const axios = require('axios');
                const cache = new ExpiredStorage();
                ${me._hook.join(`
                `)}
                return {
                    state: {
                        ${me._stackState.join(',')}
                    },
                    getters: {
                        ${me._stackGetter.join(',')}
                    },
                    mutations: {
                        ${me._stackMutation.join(',')}
                    },
                    actions: {
                        ${me._stackAction.join(',')}
                    }
                } 
            }())     
        `
    }

    Vax.prototype.render = (me, tablet) => {
        Vax.buildVuex(tablet, (vuex) => {
            Vax.buildCache(tablet, vuex, (vuex, cache) => {
                Vax.buildAxios(tablet, vuex, cache, (vuex, cache, axios) => {
                    me._hook.push(`
                        ${!tablet.hook ? '' : 'const ' + tablet.hookClass + " = require('" + tablet.hook + "');"}
                    `)
                    vuex.state && me._stackState.push(`
                        ${vuex.state}
                    `)
                    vuex.getter && me._stackGetter.push(`
                        ${vuex.getter}
                    `)
                    vuex.mutation && me._stackMutation.push(`
                        ${vuex.mutation}
                    `)
                    me._stackAction.push(`            
                        ${vuex.action}{        
                            ${!tablet.hookClass ? '' : 'if('+(tablet.hookClass + '.beforePromise && ' + tablet.hookClass + '.beforePromise({ commit, state },param)')+'===false){reject();return;}'}                    
                            return new Promise(function(resolve,reject){                                
                                ${cache.template}
                                ${axios.template}
                                ${vuex.template}
                            });
                        }                    
                    `)
                })
            })
        })
    }
}

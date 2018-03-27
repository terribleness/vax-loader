
const vue = require('vue')
const vuex = require('vuex')


module.exports = initVuex = (Vax) => {
    //vue.use(vuex)
    //Vax.$vue = vue;
    Vax.$vuex = vuex;

    Vax.buildVuex = (tablet = {}, callback) => {
        const commit = !tablet.vuex ? '' : `${!tablet.hookClass?'':('if('+(tablet.hookClass + '.beforeVuex && ' + tablet.hookClass+'.beforeVuex({ commit, state },param,data)')+'===false){reject(data);return;}')} 
        commit('${tablet.name}',data); 
        ${!tablet.hookClass?'':'if('+(tablet.hookClass + '.afterVuex && ' + tablet.hookClass+'.afterVuex({ commit, state },param,data)')+'===false){reject(data);return;}'} 
        `;
        const stateName = (tablet.name + '_' + (!tablet.vuex ? '' : !tablet.vuex.state ? `${tablet.name}` : `${tablet.vuex.state}`)).replace(/\./g,'_');
        callback({
            action: `${tablet.name}({ commit, state },param)`,
            commit,
            template: (function () {
                if (!tablet.cache && !tablet.axios) {
                    return `
                        ${commit}
                        resolve(data);
                    `
                }
                else {
                    return ''
                }
            }()),
            mutation: (function () {
                const mutationName = !tablet.vuex ? '' : !tablet.vuex.mutation ? `${tablet.name}` : `${tablet.vuex.mutation}`;
                if (!mutationName) return '';
                return `
                        ${mutationName}:(state,data)=>{
                            // if(Object.prototype.toString.call(data)=='[object Object]'){
                            //     for(const dkey in data){
                            //         state.${stateName}[key] = data[key];
                            //     }
                            // }
                            // else{
                                state.${stateName} = data;
                            // }
                        }                   
                    `
            }()),
            getter: (function () {
                const getterName = !tablet.vuex ? '' : !tablet.vuex.getter ? `${tablet.name}` : `${tablet.vuex.getter}`;
                if (!getterName) return '';
                return `
                        ${getterName}:(state)=>{
                            return state.${stateName};
                        }                   
                    `
            }()),
            state: (function () {
                if (!stateName) return '';
                return `${stateName}:null`
            }())
        })
    }
}
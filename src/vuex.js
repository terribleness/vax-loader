
const vue = require('vue')
const vuex = require('vuex')


module.exports = initVuex = (Vax) => {
    //vue.use(vuex)
    //Vax.$vue = vue;
    Vax.$vuex = vuex;

    Vax.buildVuex = (table = {}, callback) => {
        const commit = !table.vuex ? '' : `p.param = param;p.data = data;
                            ${!table.hookClass?'':('if('+(table.hookClass + '.beforeVuex && ' + table.hookClass+'.beforeVuex({ commit, state ,param,data})')+`===false){
                                reject(data);
                                return;
                            }`)} 
                            param = p.param;data = p.data;
                            commit('${table.name}',data); 
                                ${!table.hookClass?'':'if('+(table.hookClass + '.afterVuex && ' + table.hookClass+'.afterVuex({ commit, state ,param,data})')+`===false){
                                    reject(data);
                                    return;
                                }`} 
                                param = p.param;data = p.data;
                            `;
        const stateName = table.name;
        // const stateName = (table.name + '_' + (!table.vuex ? '' : !table.vuex.state ? `${table.name}` : `${table.vuex.state}`)).replace(/\./g,'_');
        callback({
            action: `${table.name}({ commit, state },param)`,
            commit,
            template: (function () {
                if (!table.cache && !table.axios) {
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
                const mutationName = !table.vuex ? '' : !table.vuex.mutation ? `${table.name}` : `${table.vuex.mutation}`;
                if (!mutationName) return '';
                return `
                        ${mutationName}:(state,data)=>{
                            const vueSet = (sta,key,data) => {
                                if(Object.prototype.toString.call(data)=='[object Object]'){
                                    sta[key] = {};
                                    for(const dkey in data){
                                        Vue.set(sta[key],dkey,null);
                                        vueSet(sta[key],dkey,data[dkey]);
                                    }
                                }
                                else{
                                    sta[key] = data;
                                }
                            }
                            vueSet(state,'${stateName}',data)
                        }                   
                    `
            }()),
            getter: (function () {
                const getterName = !table.vuex ? '' : !table.vuex.getter ? `${table.name}` : `${table.vuex.getter}`;
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
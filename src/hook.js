

module.exports = initHook = (Vax) => {

    Vax.hook = {
        // { commit, state }, param
        beforePromise(p) {
            //p.param = p.param.array || p.param;
        },
        // param
        beforeAxios(p) {

        },
        // param, data
        afterAxios(p) {

        },
        // beforeCache(param) {

        // },
        // afterCache(param, data) {

        // },
        // { commit, state }, param
        beforeVuex(p) {

        },
        // { commit, state }, param, data
        afterVuex(p) {

        }
    }

    Vax.prototype.hook = (table) => {
        table.hookClass = '';
        if (table.hook) {
            table.hookClass = table.name + '_' + table.hook.split('/').pop();
            table.hookMethod = Vax.hook;
            //const customHook = require(table.hook);
            // for (let key in Vax.hook) {
            //     if (Vax.hook.hasOwnProperty(key) && Object.prototype.toString.call(customHook[key]) == '[object Function]') {
            //         table.hookMethod[key] = customHook[key];
            //     }
            // }
        }
        return table;
    }
}
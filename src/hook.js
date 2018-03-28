

module.exports = initHook = (Vax) => {

    Vax.hook = {
        beforePromise({ commit, state }, param) {
            param = param.array || param;
        },
        beforeAxios(param) {

        },
        afterAxios(param, data) {

        },
        // beforeCache(param) {

        // },
        // afterCache(param, data) {

        // },
        beforeVuex({ commit, state }, param) {

        },
        afterVuex({ commit, state }, param, data) {

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
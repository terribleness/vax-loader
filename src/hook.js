

module.exports = initHook = (Vax) => {

    Vax.hook = {
        beforePromise({ commit, state }, param) {

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

    Vax.prototype.hook = (tablet) => {
        tablet.hookClass = '';
        if (tablet.hook) {
            tablet.hookClass = tablet.name + '_' + tablet.hook.split('/').pop();
            tablet.hookMethod = Vax.hook;
            //const customHook = require(tablet.hook);
            // for (let key in Vax.hook) {
            //     if (Vax.hook.hasOwnProperty(key) && Object.prototype.toString.call(customHook[key]) == '[object Function]') {
            //         tablet.hookMethod[key] = customHook[key];
            //     }
            // }
        }
        return tablet;
    }
}
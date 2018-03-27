


module.exports = {

    beforePromise({ commit, state }, param) {
        //param.a=4
    },
    beforeAxios(param) {
        // param.a = {
        //     b: 2
        // }
        // return false;
    },
    afterAxios(param, data) {
        // delete data.Passed
        // data = data.Data
    },
    beforeVuex({ commit, state }, param) {

    },
    afterVuex({ commit, state }, param, data) {

    }
}
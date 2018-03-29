


export default {

    beforePromise(p) {
        //param.a=4
        //console.log(this)
    },
    beforeAxios(p) {
        // param.a = {
        //     b: 2
        // }
        // return false;
    },
    afterAxios(p) {
        // delete data.Passed
        // data = data.Data
        p.data = JSON.parse(p.data.Data);
    },
    beforeVuex(p) {

    },
    afterVuex(p) {

    }
}
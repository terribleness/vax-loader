

const axios = require('axios')


module.exports = initAxios = (Vax) => {
    Vax.$axios = axios;

    Vax.buildAxios = (tablet = {}, vuex, cache, callback) => {
        let options = {}

        if (tablet.axios) {
            options = tablet.axios;
            // options.baseURL = process.env.NODE_ENV !== 'production' ? '' : options.baseURL;
            options.method.toLowerCase() === 'post' ? options.data = '__param__' : options.param = '__param__'
        }

        let template = '';

        if (tablet.cache) {
            template += cache.set + ';';
        }

        if (tablet.vuex) {
            template += vuex.commit;
        }


        callback(vuex, cache,
            {
                template: tablet.axios ? `
                        ${!tablet.hookClass ? '' : 'if(' + (tablet.hookClass + '.beforeAxios && ' + tablet.hookClass + '.beforeAxios(param)') + '===false){reject(data);return;}'}
                        axios(${JSON.stringify(options).replace('"__param__"','param')})
                        .then(function(data) {
                            if(data.status == 200){
                                data = data.data;
                                ${!tablet.hookClass ? '' : 'if(' + (tablet.hookClass + '.afterAxios && ' + tablet.hookClass + '.afterAxios(param,data)') + '===false){reject(data);return;}'}
                                ${template}
                                resolve(data);
                            }
                            else{
                                reject(data);
                            }
                        },reject);
                `: ''
            }
        )
    }
}


const axios = require('axios')


module.exports = initAxios = (Vax) => {
    Vax.$axios = axios;

    Vax.buildAxios = (table = {}, vuex, cache, callback) => {
        let options = {}

        if (table.axios) {
            options = table.axios;
            // options.baseURL = process.env.NODE_ENV !== 'production' ? '' : options.baseURL;
            options.method.toLowerCase() === 'post' ? options.data = '__param__' : options.param = '__param__'
        }

        let template = '';

        if (table.cache) {
            template += cache.set + ';';
        }

        if (table.vuex) {
            template += vuex.commit;
        }


        callback(vuex, cache,
            {
                template: table.axios ? `              
                        ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.beforeAxios && ' + table.hookClass + '.beforeAxios(p)') + '===false){reject(param);return;}'}
                        param = p.param;
                        axios(${JSON.stringify(options).replace('"__param__"','param')})
                        .then(function(data) {
                            if(data.status == 200){
                                data = data.data;
                                p.data = data;
                                ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.afterAxios && ' + table.hookClass + '.afterAxios(p)') + '===false){reject(data);return;}'}
                                data = p.data;
                                param = p.param;
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
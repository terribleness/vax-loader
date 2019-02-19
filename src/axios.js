

const axios = require('axios')


module.exports = initAxios = (Vax) => {
    Vax.$axios = axios;

    
    Vax.buildAxios = (table = {}, vuex, cache, callback) => {
        let options = {}

        if (table.axios) {
            options = table.axios;
            options.baseURL = process.env.NODE_ENV !== 'production' ? '' : options.baseURL;
            options.withCredentials = options.withCredentials ? true : false;
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
                        p.axios = ${JSON.stringify(options)};   
                        if(p.axios.method && (p.axios.method.toLowerCase() === 'post' || p.axios.method.toLowerCase() === 'put')){
                            p.axios.data = p.param;
                        }  
                        else{
                            p.axios.params = p.param ;
                        }
                        ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.beforeAxios && ' + table.hookClass + '.beforeAxios(p)') + `===false){
                            reject(param);
                            return;
                        }`}
                        axios(p.axios)
                        .then(function(data) {
                            p.data = data;
                            if(data.status == 200){
                                data = data.data;
                                p.data = data;
                                ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.afterAxios && ' + table.hookClass + '.afterAxios(p)') + `===false){
                                    reject(data);
                                    return;
                                }`}
                                data = p.data;
                                param = p.param;
                                ${template}
                                resolve(data);
                            }
                            else{
                                ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.netError && ' + table.hookClass + '.netError(p)') + `===false){
                                    reject(data);
                                    return;
                                }`}
                            }
                        },data=>{
                            p.data = data;
                            ${!table.hookClass ? '' : 'if(' + (table.hookClass + '.netError && ' + table.hookClass + '.netError(p)') + `===false){
                                reject(data);
                                return;
                            }`}
                        });
                `: ''
            }
        )
    }
}

const cache = require('expired-storage')

module.exports = initCache = (Vax) => {
    Vax.$cache = cache;

    Vax.buildCache = (table = {}, vuex, callback) => {
        const year = 3600; // 3600 秒
        const time = !table.cache ? year : !table.cache.time ? year : table.cache.time;
        const log =  process.env.NODE_ENV !== 'production' ? "console.log('从cache中读取数据');" : '';
        let template = table.cache ? `
                const data = cache.getJson(cacheKey);
                if(data){
                    ${log}
                    ${vuex.commit}
                    resolve(data);
                    return;
                }`: '';

        template = !table.axios && !table.vuex && table.cache ? `cache.setJson(cacheKey,data,${time});resolve(data);` : template;

        template = !table.axios && table.cache && table.vuex ? `
            ${template}
            else{
                cache.setJson(cacheKey,data,${time});resolve(data);
            }
        `: template;

        template = `
            const cacheKey = '${table.name}'+JSON.stringify(param);
            ${template}
        `

        callback(vuex, {
            set: `cache.setJson(cacheKey, data, ${time}) `,
            get: `cache.getJson(cacheKey) `,
            template
        })
    }
}
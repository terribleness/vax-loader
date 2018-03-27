
const cache = require('expired-storage')

module.exports = initCache = (Vax) => {
    Vax.$cache = cache;

    Vax.buildCache = (tablet = {}, vuex, callback) => {
        const year = 3600; // 3600 秒
        const time = !tablet.cache ? year : !tablet.cache.time ? year : tablet.cache.time;
        const log =  process.env.NODE_ENV !== 'production' ? "console.log('从cache中读取数据');" : '';
        let template = tablet.cache ? `
                const data = cache.getJson(cacheKey);
                if(data){
                    ${log}
                    ${vuex.commit}
                    resolve(data);
                    return;
                }`: '';

        template = !tablet.axios && !tablet.vuex && tablet.cache ? `cache.setJson(cacheKey,data,${time});resolve(data);` : template;

        template = !tablet.axios && tablet.cache && tablet.vuex ? `
            ${template}
            else{
                cache.setJson(cacheKey,data,${time});resolve(data);
            }
        `: template;

        template = `
            const cacheKey = '${tablet.name}'+JSON.stringify(param);
            ${template}
        `

        callback(vuex, {
            set: `cache.setJson(cacheKey, data, ${time}) `,
            get: `cache.getJson(cacheKey) `,
            template
        })
    }
}


这是一个用于Vue-cli的loader，根据.vax.xml文件中配置，在Vue 中自动生成Vuex、Axios、Cache文件，将前端工作完全不需考虑ajax和vue的状态管理这些繁杂的事情，一步配置，代码自动生成。

1、 进入目录 vax-loader 跟目录
2、 npm install 后 npm link 调试模式下降vax-loader加入本地库
3、进入目录  cd example
4、 npm install 后 npm link vax-loader 
5、安装后，npm run dev 就可以看到有vax.xml中配置请求发送了

主要是自动生成下面的内容模板：


            (function(){
                const ExpiredStorage = require('expired-storage');
                const vue = require('vue');
                const axios = require('axios');
                const cache = new ExpiredStorage();

                        const GETUSER_usertroller = require('./usertroller');

                return {
                    state: {

                        GETUSER_my_user:null

                    },
                    getters: {


                        GETUSER:(state)=>{
                            return state.GETUSER_my_user;
                        }


                    },
                    mutations: {


                        GETUSER:(state,data)=>{
                            // if(Object.prototype.toString.call(data)=='[object Object]'){
                            //     for(const dkey in data){
                            //         state.GETUSER_my_user[key] = data[key];
                            //     }
                            // }
                            // else{
                                state.GETUSER_my_user = data;
                            // }
                        }


                    },
                    actions: {

                        GETUSER({ commit, state },param){
                            if(GETUSER_usertroller.beforePromise && GETUSER_usertroller.beforePromise({ commit, state },param)===false){reject();return;}
                            return new Promise(function(resolve,reject){

            const cacheKey = 'GETUSER'+JSON.stringify(param);

                const data = cache.getJson(cacheKey);
                if(data){
                    console.log('从cache中读取数据');
                    if(GETUSER_usertroller.beforeVuex && GETUSER_usertroller.beforeVuex({ commit, state },param,data)===false){reject(data);return;}
        commit('GETUSER',data);
        if(GETUSER_usertroller.afterVuex && GETUSER_usertroller.afterVuex({ commit, state },param,data)===false){reject(data);return;}

                    resolve(data);
                    return;
                }


                        if(GETUSER_usertroller.beforeAxios && GETUSER_usertroller.beforeAxios(param)===false){reject(data);return;}
                        axios({"method":"POST","baseURL":"http://www.server.com","url":"/api/user","withCredentials":"true","headers":{"Content-Type":"application/x-www-form-urlencoded"},"data":param})
                        .then(function(data) {
                            if(data.status == 200){
                                data = data.data;
                                if(GETUSER_usertroller.afterAxios && GETUSER_usertroller.afterAxios(param,data)===false){reject(data);return;}
                                cache.setJson(cacheKey, data, 300000) ;if(GETUSER_usertroller.beforeVuex && GETUSER_usertroller.beforeVuex({ commit, state },param,data)===false){reject(data);return;}
        commit('GETUSER',data);
        if(GETUSER_usertroller.afterVuex && GETUSER_usertroller.afterVuex({ commit, state },param,data)===false){reject(data);return;}

                                resolve(data);
                            }
                            else{
                                reject(data);
                            }
                        },reject);


                            });
                        }

                    }
                }
            }())

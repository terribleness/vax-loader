这是一个用于Vue-cli的loader，根据.vax.xml文件中配置，在Vue 中自动生成Vuex、Axios、Cache文件，将前端工作完全不需考虑ajax和vue的状态管理这些繁杂的事情，一步配置，代码自动生成。

1、 进入目录 vax-loader 跟目录
2、 npm install 后 npm link 调试模式下降vax-loader加入本地库
3、进入目录  cd example
4、 npm install 后 npm link vax-loader 
5、安装后，npm run dev 就可以看到有vax.xml中配置请求发送了

主要是自动生成下面的内容模板：


            import cache from 'expired-storage';
            import Vuex from 'Vuex';
            import axios from 'axios';

                        import GETUSER_usertroller from "./usertroller"



            export const store = new Vuex.Store({
                state: {

                        GETUSER:null
                    ,
                        GETMEMBER:null

                },
                getters: {


                        GETUSER:(state)=>{
                            return state.GETUSER;
                        }

                    ,

                        GETMEMBER:(state)=>{
                            return state.GETMEMBER;
                        }


                },
                mutations: {


                        GETUSER:(state,data)=>{
                            state.GETUSER = data;
                        }

                    ,

                        GETMEMBER:(state,data)=>{
                            state.GETMEMBER = data;
                        }


                },
                actions: {

                        GETUSER({ commit, state },param){
                            GETUSER_usertroller.beforeVuex({ commit, state },param);
                            return new Promise(resolve,reject){

            const cacheKey = 'GETUSER'+JSON.stringify(param);

                const data = cache.get(cacheKey);
                if(data){
                    GETUSER_usertroller.beforeVuex({ commit, state },param,data); commit("GETUSER",data);
                    resolve(data);
                    return;
                }


                        GETUSER_usertroller.beforeAxios(param);
                        axios({
                            method:'post',
                            url:'/api/user',
                            data:param
                        })
                        .then(function(data) {
                            GETUSER_usertroller.afterAxios(param,data);
                            cache.set(cacheKey, data, 300000) ;GETUSER_usertroller.beforeVuex({ commit, state },param,data); commit("GETUSER",data);
                            resolve(data);
                        });


                            }
                        }
                    ,
                        GETMEMBER({ commit, state },param){

                            return new Promise(resolve,reject){

            const cacheKey = 'GETMEMBER'+JSON.stringify(param);

                const data = cache.get(cacheKey);
                if(data){
                     commit("GETMEMBER",data);
                    resolve(data);
                    return;
                }



                        axios({
                            method:'get',
                            url:'/api/member',
                            param:param
                        })
                        .then(function(data) {

                            cache.set(cacheKey, data, 300000) ; commit("GETMEMBER",data);
                            resolve(data);
                        });


                            }
                        }

                }
            })

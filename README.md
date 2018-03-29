<table class="d-block">
  <tbody class="d-block">
    <tr class="d-block">
      <td class="d-block comment-body markdown-body  js-comment-body"><h2>5步完成，修改下图红框出文件：</h2>
        <p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38087033-3c4be2d0-3389-11e8-88b3-6a3b3b963f6e.PNG"><img src="https://user-images.githubusercontent.com/37056647/38087033-3c4be2d0-3389-11e8-88b3-6a3b3b963f6e.PNG" alt="1" style="max-width:100%;"></a></p>

          <table>
            <tbody><tr>
              <td><strong>文件</strong></td>
              <td><strong>修改</strong></td>
            </tr>

              <tr>
                <td>webpack.base.config.js文件的rules下增加vax-loader</td>
                <td>
                  {
                    test: /\.vax.xml$/,
                loader: 'vax-loader'
            }
            <a href="#ext1">查看下图例子</a>
                </td>
              </tr>
              <tr>
                <td>src目录下增加1.vax.xml后缀配置文件</td>
                <td><a href="#ext3">具体查看1.vax.xml配置文件内容</a></td>
              </tr>
              <tr>
                <td>App.vue等等页面文件中</td>
                <td>
                  根据配置，同vuex一样的调用，<a href="#ext4">查看下图例子</a>
                </td>
              </tr>
              <tr>
                <td>main.js文件</td>
                <td>var vax = require('./1.vax.xml')，并赋值给new Vuex.store(vax)<a href="#ext5">查看下图例子</a></td>
              </tr>
              <tr>
                <td>src目录下hooks存放hook文件（非必须）</td>
                <td><a href="#ext2">具体查看hook钩子函数使用方法</a></td>
              </tr>
            </tbody></table><p>
          </p><h3><a name="user-content-ext1">webpack.base.config.js文件的rules下增加vax-loader</a></h3><p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38087283-25b685d8-338a-11e8-9bb1-b9a417ad6413.PNG"><img src="https://user-images.githubusercontent.com/37056647/38087283-25b685d8-338a-11e8-9bb1-b9a417ad6413.PNG" alt="2" style="max-width:100%;"></a></p><p></p><p>
          </p><h3><a name="user-content-ext5">main.js文件内容</a></h3><p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38088210-93e9efec-338d-11e8-9127-d6717a19a3e3.PNG"><img src="https://user-images.githubusercontent.com/37056647/38088210-93e9efec-338d-11e8-9127-d6717a19a3e3.PNG" alt="4" style="max-width:100%;"></a></p><p></p><p>
          </p><h3><a name="user-content-ext4">App.vue等等页面文件中使用</a></h3><p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38088230-a49aae76-338d-11e8-8e2c-caf4eaee2e1f.PNG"><img src="https://user-images.githubusercontent.com/37056647/38088230-a49aae76-338d-11e8-8e2c-caf4eaee2e1f.PNG" alt="3" style="max-width:100%;"></a></p><p></p><p>
          </p><h3><a name="user-content-ext3">.vax.xml配置文件</a></h3><p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38089028-9e426d7c-3390-11e8-82c0-4e9467714cd6.PNG"><img src="https://user-images.githubusercontent.com/37056647/38089028-9e426d7c-3390-11e8-82c0-4e9467714cd6.PNG" alt="9" style="max-width:100%;"></a></p><table>











          </table><strong>配置项说明</strong><table>
                    <tbody><tr></tr>
                      <tr><td>vax（必填）</td><td>根节点（必填）
</td></tr>
                      <tr><td>table（必填且全局唯一）</td><td>vuex中action、mutation、getter、state名字，多个请求则配置多个table</td></tr>
                      <tr><td>hook（选填）</td><td>为hook文件地址，其中有5个钩子函数，可以修改进行中状态，如参数修改，返回值修改，触发其他commit等
</td></tr>
                      <tr><td>axios（选填）</td><td>配置则启用ajax请求，配置节点与<a href="https://github.com/axios/axios#request-config">axios配置</a>保持一致，注意baseURL只会在发布版本启动，调试版本不会启动</td></tr>
                      <tr><td>cache（选填）</td><td>可配置缓存时间，单位秒，存在localstorage中</td></tr>
                      <tr><td>vuex（选填）</td><td>一定会根据name生成action，但是mutation、getter、state是否生成是根据这个节点是否配置来决定的</td></tr>
                    </tbody></table>
                  <p></p>
                  <p>
                  </p><h3><a name="user-content-ext2">hook钩子函数使用方法</a></h3>
                  <p><a target="_blank" href="https://user-images.githubusercontent.com/37056647/38088606-f7cb6a30-338e-11e8-9d87-50c377c9091a.PNG"><img src="https://user-images.githubusercontent.com/37056647/38088606-f7cb6a30-338e-11e8-9d87-50c377c9091a.PNG" alt="7" style="max-width:100%;"></a></p>
                    <table>
                      <tbody><tr><td><strong>钩子名称</strong></td><td><strong>触发时间<strong></strong></strong></td><td><strong>参数格式</strong></td></tr>
                        <tr><td>beforePromise</td><td>任何操作前</td><td>p参数内容为{commit,state,param}三个参数commit是vuex中commit；state是vuex中state；param是dispatch传递的参数，如果要修改param，需要为p.param = 这样写法</td></tr>
                        <tr><td>beforeAxios</td><td>开始触发axios前</td><td>p参数内容为{commit,state,param}三个参数，同上</td></tr>
                        <tr><td>afterAxios</td><td>axios后获得数据了</td><td>p参数内容为{commit,state,param,data}四个参数，同上，data为返回数据，如果修改data，需要为p.data= 这样写法</td></tr>
                        <tr><td>beforeVuex</td><td>vuex触发commit前</td><td>p参数内容为{commit,state,param,data}四个参数，同上</td></tr>
                        <tr><td>afterVuex</td><td>vuex触发commit后</td><td>p参数内容为{commit,state,param,data}四个参数，同上</td></tr>
                      </tbody></table>
                    <p></p></td>
    </tr>
  </tbody>
</table>
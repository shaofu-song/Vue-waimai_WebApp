/**
 * 入口JS
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './mock/mockServer' // 加载mockServer即可
import loading from './common/imgs/loading.gif'
import './filters' // 加载过滤器

//注册全局组件标签
Vue.component(Button.name, Button)// <mt-button>
Vue.use(ElementUI);

//图片懒加载(插件)
Vue.use(VueLazyload, { //内部自定义一个指令lazy
  loading
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store //使用上vuex
})

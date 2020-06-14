import Vue from 'vue'
import App from './App'
import store from './store'


Vue.config.productionTip = false


//全局组件
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);


Vue.prototype.$store = store 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

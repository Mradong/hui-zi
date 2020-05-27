import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


//全局组件
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

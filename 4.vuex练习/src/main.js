import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
//使用插件
Vue.use(vueResource)


new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import LiUI from '../packages'

Vue.config.productionTip = false
Vue.use(LiUI)
new Vue({
  render: h => h(App)
}).$mount('#app')

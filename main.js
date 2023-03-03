import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import util from './common/util'
import httpApi from './common/httpApi.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.util = util
Vue.prototype.httpApi = httpApi

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
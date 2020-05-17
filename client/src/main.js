import Vue from 'vue'
import Axios from 'axios'
import VueCompositionApi from '@vue/composition-api'
import Toasted from 'vue-toasted'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.use(VueCompositionApi)
Vue.use(Toasted)

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

if (process.env.NODE_ENV === 'development') {
    Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000'
} else {
    Vue.prototype.$http.defaults.baseURL = 'https://api.example.com'
}

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')

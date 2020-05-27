import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, DropdownPlugin, TablePlugin,NavPlugin,ModalPlugin} from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/font-awesome/css/font-awesome.css'

Vue.use (DropdownPlugin)
Vue.use (TablePlugin)
Vue.use(ModalPlugin)
Vue.config.productionTip = true
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use (DropdownPlugin)
Vue.use (TablePlugin)
Vue.use (NavPlugin)
new Vue({
  render: h => h(App),
}).$mount('#app')

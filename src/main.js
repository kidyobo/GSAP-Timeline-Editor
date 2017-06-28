// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ButtonDropdown from './components/button-dropdown'
import vmodal from 'vue-js-modal'
import Timeline from './components/Timeline'
import PropertiesPanel from './components/PropertiesPanel'
 
Vue.use(vmodal)

Vue.component('button-dropdown', ButtonDropdown)
Vue.component('timeline', Timeline)
Vue.component('properties-panel', PropertiesPanel)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
